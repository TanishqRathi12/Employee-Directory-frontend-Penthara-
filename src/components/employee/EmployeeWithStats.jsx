import { useState } from "react";
import { useGetFilteredEmployees } from "../../query/employeeQueries";
import Loader from "../common/Loader";
import EmployeeCard from "./EmployeeCard";
import EmployeeSearch from "./EmployeeSearch";

const StatCard = (
  { label, value, accent = false },
) => (
  <div
    className={`rounded-xl border p-5 flex flex-col justify-center ${
      accent
        ? "border-transparent bg-white text-white shadow-sm"
        : "border-slate-200 bg-white"
    }`}
  >
    <p className="text-sm text-[#0F172A]">{label}</p>
    <p className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A]">
      {value}
    </p>
  </div>
);

const StatBreakdown = (
  { label, data },
) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5">
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <div className="mt-3 max-h-40 space-y-2 overflow-y-auto pr-1">
      {data?.length ? (
        data.map(({ _id, count }) => (
          <div key={_id} className="flex items-center justify-between text-sm">
            <span className="truncate text-slate-700">
              {_id || "Unassigned"}
            </span>
            <span className="ml-2 shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
              {count}
            </span>
          </div>
        ))
      ) : (
        <p className="text-sm text-slate-400">No data</p>
      )}
    </div>
  </div>
);

const EmployeeWithStats = ({
  // It is the main component that displays the statistics and the list of employees with search functionality
  employees = [],
  allEmployees,
  stats,
  loadingAll,
  onSeeAll,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isSearchActive = searchQuery.trim().length > 0;

  // Avoid issuing a request until the user enters a non-empty search term.
  const {
    data: filteredEmployees,
    isLoading: isSearching,
    isError: isSearchError,
  } = useGetFilteredEmployees(searchQuery, {
    enabled: isSearchActive,
  });

  const handleSeeAll = () => {
    setExpanded(true);
    if (!allEmployees) onSeeAll?.();
  };

  let visibleEmployees = expanded && allEmployees ? allEmployees : employees;
  if (isSearchActive) {
    // Search results take precedence over the expanded or default employee list.
    visibleEmployees = filteredEmployees ?? [];
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Employees"
          value={stats?.totalEmployees ?? 0}
          accent
        />
        <StatBreakdown
          label="By Department"
          data={stats?.employeesByDepartment}
        />
        <StatBreakdown label="By Role" data={stats?.employeesByRole} />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-md">
          <EmployeeSearch onSearch={(query) => setSearchQuery(query ?? "")} />{" "}
        </div>
      </div>

      {/* loader/empty/error states are shown within this section */}
      <div className="mt-8 min-h-30">
        {isSearchActive && isSearching ? (
          <div className="flex justify-center py-10">
            <span
              className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#0F62D6]"
              role="status"
              aria-label="Loading"
            />
          </div>
        ) : isSearchActive && isSearchError ? (
          <p className="py-10 text-center text-sm text-red-500">
            Something went wrong while searching. Please try again.
          </p>
        ) : isSearchActive && visibleEmployees.length === 0 ? (
          <p className="max-w-full wrap-break-word px-4 py-10 text-center text-sm text-slate-400">
            No employees match "<span className="break-all">{searchQuery}</span>
            ".
          </p>
        ) : !isSearchActive && visibleEmployees.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">
            No employees added yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleEmployees.map((emp, idx) => (
              <EmployeeCard
                key={emp._id ?? idx}
                id={emp._id}
                name={emp.name}
                department={emp.department}
                role={emp.role}
              />
            ))}
          </div>
        )}
      </div>

      {!isSearchActive &&
        !expanded &&
        (employees.length > 6 || allEmployees?.length > 6) && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSeeAll}
              disabled={loadingAll}
              className="rounded-md border border-[#0F62D6] px-4 py-2 text-sm font-medium text-[#0F62D6] transition-colors hover:bg-[#0F62D6] hover:text-white disabled:opacity-60"
            >
              {loadingAll ? "Loading..." : "See all employees"}
            </button>
          </div>
        )}

      {!isSearchActive && loadingAll && (
        <div className="mt-4 flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default EmployeeWithStats;
