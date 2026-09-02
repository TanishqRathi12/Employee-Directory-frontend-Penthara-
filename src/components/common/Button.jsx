
// Common Button Component for reusable button elements
const Button = ({ children, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
