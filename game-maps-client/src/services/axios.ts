import Axios from "axios";

const axios = Axios.create({
    baseURL: `/api`,
});

axios.interceptors.request.use(x => {
    x.baseURL = `${window.settings.url}/api` || "/api"
    return x;
})

export default axios;