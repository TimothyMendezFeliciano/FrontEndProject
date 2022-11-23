import axios from "axios";

const authAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

export default authAxios