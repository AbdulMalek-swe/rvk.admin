import axios from "axios";

const api = axios.create({
    baseURL: 'https://rvkapidevbymossaddakv16.pythonanywhere.com/' ,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

 api.interceptors.request.use(
    async (config) => {
      const token1 = localStorage.getItem("access_token");
      if (token1?.length > 0) {
        config.headers.Authorization = `Bearer ${token1}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default api;
