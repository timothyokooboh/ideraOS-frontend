import http from "../http-client/auth-common"

class AuthDataService {
    // Method for registering users
    register(data) {
        return http.post("/register/store", data)
    }

    // Method for logging in users
    login(data) {
        return http.post("/login/loginUser", data)
    }
}

export default new AuthDataService()

