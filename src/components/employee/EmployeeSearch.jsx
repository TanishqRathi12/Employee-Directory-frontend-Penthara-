import { useEffect, useState } from "react";
import useDebounce from "../../hooks/UseDebounce";



const EmployeeSearch = ({ onSearch, placeholder = "Search by name or department..." }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);  // Debounce input to avoid frequent search requests.

  useEffect(() => {
    onSearch?.(debouncedQuery.trim());  /* Trim whitespace before sending the search term. */
  }, [debouncedQuery, onSearch]);

  return (
    <div className="relative mb-6">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 10-10.6 0 7.5 7.5 0 0010.6 0z" />
      </svg>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-400 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#0F62D6] focus:outline-none focus:ring-1 focus:ring-[#0F62D6]"
      />
      {/* Show the clear action only when there is text to remove. */}
      {query && (      
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default EmployeeSearch;