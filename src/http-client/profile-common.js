// Initialize axios http client
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3000/api/profile",
    headers: {
        "Content-type": "application/json"
    }
})