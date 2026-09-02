
// ErrorMessage Component to display error messages in a styled manner
const ErrorMessage = ({
  message = "Something went wrong. Please try again.",
  className = "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700",
}) => {
  return <div className={className}>{message}</div>;
};

export default ErrorMessage;
