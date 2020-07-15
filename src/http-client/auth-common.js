// Initialize axios http client
import axios from "axios";

export default axios.create({
    baseURL: "api/user",
    headers: {
        "Content-type": "application/json"
    }
})