import { useController } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';


// Common Input Component for form fields
const Input = ({ name, control, rules, label, id, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue: '' });

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={id || name}
        className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/40 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={error ? 'true' : 'false'}
        {...field}
        {...props}
      />

      {error && (
        <ErrorMessage message={error.message} className="text-sm text-red-600" />
      )}
    </div>
  );
};

export default Input;