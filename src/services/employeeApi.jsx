import instance from "./axios";

//API service for fetching the initial Employee data from backend using axios instance
export const getEmployees = async () => {
    const response = await instance.get("/");
    return response.data;
}

//API service for fetching all Employee data from backend using axios instance
export const getAllEmployees = async () => {
    const response = await instance.get("/all");
    return response.data;
}

//API service for editing an existing Employee data in backend using axios instance
export const addEmployee = async (employeeData) => {
    const response = await instance.post("/add", employeeData);
    return response.data;
}


//API service for editing an existing Employee data in backend using axios instance
export const editEmployee = async (data) => {
    const response = await instance.patch(`/edit/${data.id}`, data.data);
    return response.data;
}

//API service for fetching Employee statistics data from backend using axios instance
export const getStatistics = async () => {
    const response = await instance.get("/stats");
    return response.data;
}

//API service for fetching filtered Employee data from backend using axios instance
export const getFilteredEmployees = async (query) => {
    const response = await instance.get(`/search?filter=${encodeURIComponent(query)}`);
    return response.data.data;
}

