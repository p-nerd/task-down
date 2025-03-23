import axios from "axios";
import nprogress from "nprogress";

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.axios.interceptors.request.use(
    (config) => {
        nprogress.start();
        return config;
    },
    (error) => {
        nprogress.done();
        return Promise.reject(error);
    },
);

window.axios.interceptors.response.use(
    (response) => {
        nprogress.done();
        return response;
    },
    (error) => {
        nprogress.done();
        return Promise.reject(error);
    },
);
