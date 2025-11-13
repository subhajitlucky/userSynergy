import { useState } from "react";
import type { User } from "../type/user";
import { createUserApi } from "../api/users";

interface UserFormProps {
  onUserCreated: (user: User) => void;
}

const UserForm = ({ onUserCreated }: UserFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in name, email, and phone.");
      return;
    }

    try {
      setSubmitting(true);

      const created = await createUserApi({ name, email, phone });

      const optimisticUser: User = {
        id: (created.id as number) || Date.now(),
        name,
        email,
        phone,
      };

      onUserCreated(optimisticUser);

      setSuccess("User successfully created (simulated via JSONPlaceholder).");
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error while creating user.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <h2 className="text-base font-semibold text-slate-900 mb-3 dark:text-slate-100">Create New User</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Jane Doe"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="jane@example.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/60 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="123-456-7890"
          />
        </div>
        <div className="flex gap-2 sm:justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-medium disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      {success && <p className="mt-2 text-xs text-emerald-400 font-medium">{success}</p>}
    </div>
  );
};

export default UserForm;
