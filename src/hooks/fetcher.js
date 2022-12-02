import axios from "axios";

export const fetcher = axios.create({
  baseURL: "https://wood-manufacturer-server-production.up.railway.app/",
});
