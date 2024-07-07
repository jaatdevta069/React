import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:245"
})

export const priavteInstance = axios.create({
  baseURL: "http://localhost:245",
  withCredentials: true,
  headers:{"Content-Type":"application/json"}
})