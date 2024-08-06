import ApiService from "./postService";

export const empApi = new ApiService("http://127.0.0.1:5000/", "employees");
export const depApi = new ApiService("http://127.0.0.1:5000/", "departments");
export const projApi = new ApiService("http://127.0.0.1:5000/", "projects");
