import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//Axios instance with a base URL and default headers for making API requests to the backend server.
const instance = axios.create({ 
  baseURL: `${API_BASE_URL}/employees`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default instance;