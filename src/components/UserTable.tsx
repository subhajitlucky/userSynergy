import { Link } from "react-router-dom";
import type { User } from "../type/user";
import { useState } from "react";

interface UserTableProps {
    users: User[];
    editingUserId?: number | null;
    onStartEdit?: (id: number) => void;
    onCancelEdit?: () => void;
    onSaveEdit?: (updated: { id: number; name: string; email: string; phone: string }) => void;
    onDelete?: (user: User) => void;
}
interface EditableRowProps {
    user: User;
    onSave?: (updated: { id: number; name: string; email: string; phone: string }) => void;
    onCancel?: () => void;
}

interface EditableCardProps {
    user: User;
    onSave?: (updated: { id: number; name: string; email: string; phone: string }) => void;
    onCancel?: () => void;
}

//here we are creating the editable row for desktop
//we are passing the user as a prop to the component
const EditableRow = ({ user, onSave, onCancel }: EditableRowProps) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    return (
        <tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <td className="px-4 py-3">
                <input
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </td>
            <td className="px-4 py-3">
                <input
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </td>
            <td className="px-4 py-3">
                <input
                    className="w-full px-2 py-1 text-sm border border-slate-300 rounded dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onSave && onSave({ id: user.id, name, email, phone })}
                        className="px-2 py-1 text-xs rounded bg-emerald-500 text-white hover:bg-emerald-400"
                    >
                        Save
                    </button>
                    <button
                        onClick={onCancel}
                        className="px-2 py-1 text-xs rounded border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        Cancel
                    </button>
                </div>
            </td>
        </tr>
    );
};

//here we are creating the editable card for mobile
//we are passing the user as a prop to the component
const EditableCard = ({ user, onSave, onCancel }: EditableCardProps) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);

    return (
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900 md:hidden">
            <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Name</label>
                <input
                    className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</label>
                <input
                    className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</label>
                <input
                    className="w-full px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
                <button
                    onClick={() => onSave && onSave({ id: user.id, name, email, phone })}
                    className="px-3 py-2 text-xs rounded bg-emerald-500 text-white hover:bg-emerald-400"
                >
                    Save
                </button>
                <button
                    onClick={onCancel}
                    className="px-3 py-2 text-xs rounded border border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

//here we are creating the user table
//we are passing the users as a prop to the component

const UserTable = ({
    users,
    editingUserId,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onDelete,
}: UserTableProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-3 md:hidden">
                {users.map((user) => {
                    const isEditing = editingUserId === user.id;

                    //if editing is true, we are returning the editable card
                    if (isEditing) {
                        return (
                            <EditableCard
                                key={user.id}
                                user={user}
                                onSave={onSaveEdit}
                                onCancel={onCancelEdit}
                            />
                        );
                    }

                    //if editing is false, we are returning the user table card
                    return (
                        <div
                            key={user.id}
                            className="rounded-lg border border-slate-200 bg-white shadow-sm p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Name
                                </p>
                                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                    {user.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Email
                                </p>
                                <p className="text-sm text-slate-700 dark:text-slate-300 break-words">
                                    {user.email}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                    Phone
                                </p>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    {user.phone}
                                </p>
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-1">
                                <Link
                                    to={`/users/${user.id}`}
                                    className="px-3 py-2 text-xs rounded border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    View
                                </Link>

                                
                                <button
                                    onClick={() => onStartEdit && onStartEdit(user.id)}
                                    className="px-3 py-2 text-xs rounded border border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete && onDelete(user)}
                                    className="px-3 py-2 text-xs rounded border border-rose-400 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}

                {users.length === 0 && (
                    <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                        No users found.
                    </div>
                )}
            </div>

            <div className="hidden md:block overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                            <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">Name</th>
                            <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">Email</th>
                            <th className="px-4 py-3 text-left font-medium text-slate-500 dark:text-slate-400">Phone</th>
                            <th className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            const isEditing = editingUserId === user.id;

                            if (isEditing) {
                                return (
                                    <EditableRow
                                        key={user.id}
                                        user={user}
                                        onSave={onSaveEdit}
                                        onCancel={onCancelEdit}
                                    />
                                );
                            }

                            return (
                                <tr
                                    key={user.id}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors dark:border-slate-800 dark:hover:bg-slate-800"
                                >
                                    <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{user.name}</td>
                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{user.email}</td>
                                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{user.phone}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/users/${user.id}`}
                                                className="px-2 py-1 text-xs rounded border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => onStartEdit && onStartEdit(user.id)}
                                                className="px-2 py-1 text-xs rounded border border-emerald-400 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete && onDelete(user)}
                                                className="px-2 py-1 text-xs rounded border border-rose-400 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {users.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-6 text-center text-slate-500 text-sm dark:text-slate-400"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;