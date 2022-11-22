import axios from "axios";

const authAxios = axios.create({
    baseURL: process.env.BACKEND_URL,
})

export default authAxios