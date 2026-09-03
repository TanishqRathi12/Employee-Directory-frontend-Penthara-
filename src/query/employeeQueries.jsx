import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";  // Importing the toast function from the sonner library for displaying notifications

import {
  addEmployee,
  editEmployee,
  getAllEmployees,
  getEmployees,
  getFilteredEmployees,
  getStatistics,
} from "../services/employeeApi";

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

/*
   GET Employees
*/

export const useEmployees = () => {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: getEmployees,
  });
};

/*
   GET All Employees
*/

export const useAllEmployees = () => {
  return useQuery({
    queryKey: employeeKeys.list,
    queryFn: getAllEmployees,
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

      toast.success(`${variables?.name} added successfully!`); // Display a success notification using the toast function from the sonner library

      // Invalidate employee lists

      queryClient.invalidateQueries({
        queryKey: employeeKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: employeeKeys.list,
      });

      queryClient.invalidateQueries({
        queryKey: employeeKeys.statistics,
      });
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

      toast.success(`${variables?.data?.name} updated successfully!`); // Display a success notification using the toast function from the sonner library

      // Invalidate employee lists
      queryClient.invalidateQueries({
        queryKey: employeeKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: employeeKeys.list,
      });

      // Invalidate specific employee
      if (employeeId !== undefined && employeeId !== null) {
        queryClient.invalidateQueries({
          queryKey: employeeKeys.detail(employeeId),
        });
      }

      // Statistics also changed
      queryClient.invalidateQueries({
        queryKey: employeeKeys.statistics,
      });
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
