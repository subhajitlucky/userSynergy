interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorAlert = ({ title = "Something went wrong", message, onRetry }: ErrorAlertProps) => {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4 flex flex-col gap-2 dark:border-red-500/50 dark:bg-red-900/30 dark:text-red-200">
      <div className="font-medium">{title}</div>
      <div>{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="self-start inline-flex px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-400"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
