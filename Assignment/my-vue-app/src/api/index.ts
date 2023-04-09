import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer token"
    },
    timeout: 3000
})

export default instance