// Initialize axios http client
import Axios from "axios";

export default Axios.create({
    baseURL: "http://localhost:3000/api/user",
    "Content-type": "application/json"
})