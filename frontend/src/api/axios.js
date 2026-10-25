import axios from "axios";

const api = axios.create({
    // Agar Vercel par URL set hai toh woh use karega, warna local laptop par localhost use karega
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export default api;