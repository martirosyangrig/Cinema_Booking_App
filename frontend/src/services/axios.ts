import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:8080/api",
});

Api.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
            "accessToken"
        )}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login page)
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export { Api };
