import http from "../http-client/profile-common"

class ProfileDataService {
    // Method for updating user profile
    update(data) {
        return http.patch("/create/store", data)
    }

    // Method for fetching user profile
    show() {
        return http.get("/get/index")
    }
}

export default new ProfileDataService()