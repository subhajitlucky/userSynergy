import { useEffect, useState, useCallback } from "react";
import type { User } from "../type/user";
import UserForm from "../components/UserForm";
import ErrorAlert from "../components/ErrorAlert";
import UserTable from "../components/UserTable";
import Loader from "../components/Loader";
import { fetchUsersApi, updateUserApi, deleteUserApi } from "../api/users";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showCreate, setShowCreate] = useState(false);

    const [editingUserId, setEditingUserId] = useState<number | null>(null);


    //here we are fetching the users from the API
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchUsersApi();
            setUsers(data);
        } catch (err) {
            const message =
                err instanceof Error ? err.message : "Unexpected error while fetching users.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    
    //we are using the useEffect hook to fetch the users
    //we are passing the fetchUsers function to the useEffect hook
    //we are calling the fetchUsers function when the component mounts
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    //here we are handling the user creation
    //we are passing the user to the function
    //we are adding the user to the local state
    const handleUserCreated = (user: User) => {
        setUsers((prev) => [user, ...prev]);
    };

    //here we are handling the user update
    //we are passing the updated user to the function
    //we are updating the user in the local state
    const handleUserUpdated = (updated: User) => {
        setUsers((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
    };

    //here we are handling the user deletion
    //we are passing the id of the user to the function
    //we are deleting the user from the local state
    const handleUserDeleted = (id: number) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 dark:bg-slate-950 dark:text-slate-50">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Users</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Manage JSONPlaceholder users (mock CRUD with live API).
                        </p>
                    </div>
                    <button
                        onClick={() => setShowCreate((v) => !v)}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-md
                       bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium
                       transition-colors"
                    >
                        {showCreate ? "Close" : "+ Add User"}
                    </button>
                </div>

                {showCreate && <UserForm onUserCreated={handleUserCreated} />}

                {loading && (
                    <Loader message="Fetching users... Please wait..." />
                )}

                {!loading && error && (
                    <ErrorAlert
                        title="Failed to load users."
                        message={error}
                        onRetry={fetchUsers}
                    />
                )}

                {!loading && !error && (
                    <UserTable
                        users={users}
                        editingUserId={editingUserId}
                        onStartEdit={(id) => {
                            setEditingUserId(id);
                        }}
                        onCancelEdit={() => {
                            setEditingUserId(null);
                        }}
                        onSaveEdit={async (partial) => {
                            try {
                                //here we are destructuring the partial user
                                const { name, email, phone } = partial;

                                //then we are adding the name, email, and phone to the payload
                                const updatedFromApi = await updateUserApi(partial.id, {
                                    name,
                                    email,
                                    phone,
                                });

                                //here we are finding the user in the local state
                                const baseUser = users.find((u) => u.id === partial.id);
                                if (!baseUser) {
                                    throw new Error("User not found in local state.");
                                }

                                //here we are updating the user in the local state with base user and partial user and updated from api
                                handleUserUpdated({
                                    ...baseUser,
                                    ...partial,
                                    ...updatedFromApi,
                                });
                                setEditingUserId(null);
                            } catch (err) {
                                const message =
                                    err instanceof Error
                                        ? err.message
                                        : "Unexpected error while updating user.";
                                setError(message);
                            }
                        }}
                        onDelete={async (user) => {
                            const confirmed = window.confirm(
                                `Are you sure you want to delete ${user.name}?`
                            );
                            if (!confirmed) return;

                            const previous = users;
                            handleUserDeleted(user.id); // optimistic remove

                            try {
                                await deleteUserApi(user.id);
                                // JSONPlaceholder won't persist; local removal is our source of truth.
                            } catch (err) {
                                // Rollback on failure
                                setUsers(previous);
                                const message =
                                    err instanceof Error
                                        ? err.message
                                        : "Unexpected error while deleting user.";
                                setError(message);
                            }
                        }}
                    />
                )}

                {!loading && !error && users.length > 0 && (
                    <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        Showing {users.length} users from JSONPlaceholder (mock data).
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;