import axios from "axios";

export const attendanceBackend = axios.create({
    baseURL: "http://localhost:8000",
    timeout: 40000,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
    }
});
