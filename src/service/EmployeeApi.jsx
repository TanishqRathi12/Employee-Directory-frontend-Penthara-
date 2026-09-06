import instance from "./Axios";

/**
 * Fetches a page of employees from the backend.
 */
export const getEmployees = async ({ page = 1, limit = 6 } = {}) => {
    const response = await instance.get("/", { params: { page, limit } });
    return response.data;
}

/**
 * Adds a new employee to the backend.
 */
export const addEmployee = async (employeeData) => {
    const response = await instance.post("/add", employeeData);
    return response.data;
}

/**
 * Edits an existing employee's data in the backend.
 */
export const editEmployee = async (data) => {
    const response = await instance.patch(`/edit/${data.id}`, data.data);
    return response.data;
}

/**
 * Fetches employee statistics data from the backend.
 */
export const getStatistics = async () => {
    const response = await instance.get("/stats");
    return response.data;
}

/**
 * Fetches filtered employee data from the backend.
 */
export const getFilteredEmployees = async (query) => {
    const response = await instance.get(`/search?filter=${encodeURIComponent(query)}`);
    return response.data.data;
}