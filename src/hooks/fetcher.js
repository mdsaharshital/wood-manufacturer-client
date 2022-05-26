import axios from "axios";

export const fetcher = axios.create({
  baseURL: "https://hidden-crag-61724.herokuapp.com/",
});
