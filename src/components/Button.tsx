export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 
                text-white font-medium transition-colors duration-200
                dark:bg-blue-500 dark:hover:bg-blue-600
                disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
} 