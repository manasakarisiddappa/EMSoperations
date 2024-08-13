import axios from "axios";

class ApiService {
  constructor(url, endpoint) {
    this.axiosInstance = axios.create({
      baseURL: url,
    });

    this.endpoint = endpoint;

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return {
          success: true,
          message: response.data.msg,
          data: response.data.data,
        };
      },
      (error) => {
        const { response } = error;
        return {
          success: false,
          message: response?.data?.msg || "An error occurred",
        };
      }
    );
  }

  // Method to get data
  getData() {
    return this.axiosInstance.get(this.endpoint);
  }

  // Method to get data by ID
  getOneData(id) {
    return this.axiosInstance.get(`${this.endpoint}/${id}`);
  }

  // Method to create new data
  create(data) {
    return this.axiosInstance.post(this.endpoint, data);
  }

  // Method to update data by ID
  update(id, data) {
    return this.axiosInstance.put(`${this.endpoint}/${id}`, data);
  }

  // Method to delete data by ID
  delete(id) {
    return this.axiosInstance.delete(`${this.endpoint}/${id}`);
  }
}

export default ApiService;
