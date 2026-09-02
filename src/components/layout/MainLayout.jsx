import {
    useAllEmployees,
    useEmployees,
    useGetStatistics,
} from "../../query/employeeQueries";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/Loader";
import EmployeeWithStats from "../employee/EmployeeWithStats";

const MaineLayout = () => {

  const {                             // It will fetch the employees data from the server using the useEmployees query
    data: employees,
    isLoading: employeesLoading,
    isError: employeesError,
  } = useEmployees();  

  const {                             // It will fetch the statistics data from the server using the useGetStatistics query
    data: statistics,
    isLoading: statisticsLoading,
    isError: statisticsError,
  } = useGetStatistics();

  const {                             // It will fetch all employees data from the server using the useAllEmployees query
    data: allEmployees,
    isLoading: allEmployeesLoading,
    isError: allEmployeesError,
  } = useAllEmployees();

  if (employeesLoading || statisticsLoading || allEmployeesLoading) {
    return <Loader />;                // Show loading while the data is fetched.
  }

  if (employeesError || statisticsError || allEmployeesError) {       // Show error message if there is an error
    return (
      <ErrorMessage message="Failed to load data. Please try again later." />
    );
  }
  return (
    <div>
      <EmployeeWithStats                         // It will render the EmployeeWithStats Component and pass the all the data fetched from server
        employees={employees.data}
        stats={statistics.data}
        allEmployees={allEmployees.data}
        loadingAll={allEmployeesLoading}
      />
    </div>
  );
};

export default MaineLayout;
