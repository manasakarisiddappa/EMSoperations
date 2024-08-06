import axios from "axios";

class ApiService {
  constructor(url, endpoint) {
    this.baseURL = url;
    this.endpoint = endpoint;
  }

  // Helper method to handle responses
  handleResponse(response) {
    return response.data;
  }

  // Helper method to handle errors
  handleError(error) {
    console.error("API error:", error);
    throw error;
  }

  // Method to get a post by ID
  getData() {
    return axios
      .get(`${this.baseURL}${this.endpoint}`)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getOneData(id) {
    return axios
      .get(`${this.baseURL}${this.endpoint}/${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // Method to create a new post
  create(data) {
    return axios
      .post(`${this.baseURL}${this.endpoint}`, data)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // Method to update a post by ID
  update(id, data) {
    return axios
      .put(`${this.baseURL}${this.endpoint}/${id}`, data)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // Method to delete a post by ID
  delete(id) {
    return axios
      .delete(`${this.baseURL}${this.endpoint}/${id}`)
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}

export default ApiService;
