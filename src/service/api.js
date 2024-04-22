import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";
const READ_ACCESS_TOKEN = import.meta.env.VITE_API_TOKEN;

const options = {
  headers: {
    Authorization: `Bearer ${READ_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async (searchUrl) => {
  const response = await axios.get(searchUrl, options);
  return response.data;
};