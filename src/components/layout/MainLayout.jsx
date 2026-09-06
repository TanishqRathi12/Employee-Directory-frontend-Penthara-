import { useMemo } from "react";
import { useEmployees, useGetStatistics } from "../../query/employeeQueries";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";
import EmployeeWithStats from "../employee/EmployeeWithStats";

const MainLayout = () => {
  const {
    // Infinite query: fetches employees page by page
    data: employeesPages,
    isLoading: employeesLoading,
    isError: employeesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEmployees();

  const {
    // It will fetch the statistics data from the server
    data: statistics,
    isLoading: statisticsLoading,
    isError: statisticsError,
  } = useGetStatistics();

  // Flatten all fetched pages into a single employees array
  const employees = useMemo(
    () =>
      employeesPages?.pages.flatMap((page) => page?.data?.employees ?? []) ??
      [],
    [employeesPages],
  );

  if (employeesLoading || statisticsLoading) {
    return <Loader />; 
  }

  if (employeesError || statisticsError) {
    return (
      <ErrorMessage message="Failed to load data. Please try again later." />
    );
  }
  return (
    <div>
      <EmployeeWithStats // It will render the EmployeeWithStats Component and pass the all the data fetched from server
        employees={employees}
        stats={statistics.data}
        hasMore={hasNextPage}
        loadingMore={isFetchingNextPage}
        onLoadMore={fetchNextPage}
      />
    </div>
  );
};

export default MainLayout;
