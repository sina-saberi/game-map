import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://192.168.150.67:8080/api",
});

export default axios