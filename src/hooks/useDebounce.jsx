import { useEffect, useState } from "react";

// Delays updating the returned value until the user stops typing
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {  // Set the debounced value after the specified delay
      setDebouncedValue(value);
    }, delay);

    // if value change again before delay finishes cancel the old timer
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;