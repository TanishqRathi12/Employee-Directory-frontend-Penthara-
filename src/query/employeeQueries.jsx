import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addEmployee,
  editEmployee,
  getEmployees,
  getFilteredEmployees,
  getStatistics,
} from "../service/EmployeeApi";

/*
   Query Keys
*/
export const employeeKeys = {
  all: ["employees"],
  list: ["employees", "list"],
  detail: (id) => ["employees", "detail", id],
  statistics: ["employees", "statistics"],
  filtered: (query) => ["employees", "filtered", query],
};

const PAGE_LIMIT = 6;

/*
   GET Employees (infinite/paginated)
*/

export const useEmployees = () => {
  return useInfiniteQuery({
    queryKey: employeeKeys.all,
    queryFn: ({ pageParam = 1 }) =>
      getEmployees({ page: pageParam, limit: PAGE_LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = lastPage?.data?.employees?.length ?? 0;
      return fetchedCount < PAGE_LIMIT ? undefined : allPages.length + 1;
    },
  });
};


/*
   GET Statistics
*/

export const useGetStatistics = () => {
  return useQuery({
    queryKey: employeeKeys.statistics,
    queryFn: getStatistics,
  });
};

/*
   ADD Employee
 */

export const useAddEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addEmployee,

    onSuccess: (_, variables) => {
      toast.success(`${variables?.name} added successfully!`);

      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      queryClient.invalidateQueries({ queryKey: employeeKeys.list });
      queryClient.invalidateQueries({ queryKey: employeeKeys.statistics });
    },
  });
};

/*
   EDIT Employee
*/

export const useEditEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editEmployee,

    onSuccess: (_, variables) => {
      const employeeId = variables?.id || variables?.employeeId;

      toast.success(`${variables?.data?.name} updated successfully!`);

      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      queryClient.invalidateQueries({ queryKey: employeeKeys.list });

      if (employeeId !== undefined && employeeId !== null) {
        queryClient.invalidateQueries({
          queryKey: employeeKeys.detail(employeeId),
        });
      }

      queryClient.invalidateQueries({ queryKey: employeeKeys.statistics });
    },
  });
};

/*
    GET Filtered Employees
*/

export const useGetFilteredEmployees = (query) => {
  return useQuery({
    queryKey: employeeKeys.filtered(query),
    queryFn: () => getFilteredEmployees(query),
    enabled: !!query,
  });
};
