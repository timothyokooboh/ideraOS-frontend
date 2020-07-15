// Initialize axios http client
import axios from "axios";

export default axios.create({
    baseURL: "api/profile",
    headers: {
        "Content-type": "application/json"
    }
})