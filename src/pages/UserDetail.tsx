import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { User } from "../type/user";
import Loader from "../components/Loader";
import ErrorAlert from "../components/ErrorAlert";
import { fetchUserApi } from "../api/users";


//here we are creating the user detail page
//we are passing the id as a prop to the component
//we are using the useParams hook to get the id from the url
//we are using the useEffect hook to fetch the user from the API
//we are passing the fetchUser function to the useEffect hook
//we are calling the fetchUser function when the component mounts
//we are returning the user detail page
const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No user ID provided.");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchUserApi(id);
        setUser(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unexpected error while fetching user.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 dark:bg-slate-950 dark:text-slate-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight dark:text-slate-100">User Detail</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">View full information for this user.</p>
          </div>
          <Link
            to="/users"
            className="text-xs px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            ← Back to Users
          </Link>
        </div>

        {loading && (
          <Loader message="Loading user details..." />
        )}

        {!loading && error && (
          <ErrorAlert title="Unable to load user." message={error} />
        )}

        {!loading && !error && user && (
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{user.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">ID: {user.id}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 dark:text-slate-400">Email</p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{user.email}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Phone</p>
                <p className="font-medium text-slate-900 dark:text-slate-100">{user.phone}</p>
              </div>
              {user.website && (
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Website</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user.website}</p>
                </div>
              )}
              {user.username && (
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Username</p>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{user.username}</p>
                </div>
              )}
            </div>

            {user.company && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1 dark:text-slate-500">Company</p>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.company.name}</p>
                {user.company.catchPhrase && (
                  <p className="text-xs text-slate-500 mt-0.5 dark:text-slate-400">{user.company.catchPhrase}</p>
                )}
              </div>
            )}

            {user.address && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1 dark:text-slate-500">Address</p>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {user.address.suite && `${user.address.suite}, `}
                  {user.address.street}, {user.address.city}
                  {user.address.zipcode && ` - ${user.address.zipcode}`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
