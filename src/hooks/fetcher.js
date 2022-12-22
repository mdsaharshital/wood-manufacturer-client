import axios from "axios";

export const fetcher = axios.create({
  baseURL: "https://wood-manufacturer-server.onrender.com/",
});
