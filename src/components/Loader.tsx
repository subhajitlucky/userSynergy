import React from "react";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      {message && (
        <p className="text-sm text-slate-500 text-center dark:text-slate-400">{message}</p>
      )}
    </div>
  );
};

export default Loader;
