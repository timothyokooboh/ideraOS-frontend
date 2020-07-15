import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";
import AuthDataService from "../services/AuthDataService"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isRegistrationSuccessful: false,
    errorMessage: "",
    isError: false,
    username: "",
    password: "",
    loadingContent: false,
    userToken: "",
    isAuth: false,
    userDetails: ""
  },

  mutations: {
    async m_login(state) {
      state.loadingContent = true;
      try {
        const loggedUser = await AuthDataService.login({
          username: state.username,
          password: state.password
        })
        state.userDetails = loggedUser.data
        console.log(this.userDetails)
        state.loadingContent = false;
        state.userToken = loggedUser.data.userToken;
        state.isAuth = true;

        // redirect to dashboard
        router.replace("/dashboard");

        // set expiry time for token
        const now = new Date().getTime()
        const expiryDate = new Date(now + 3600000)
        localStorage.setItem("expiryDate", expiryDate)

        // save token in local storage
        localStorage.setItem("userToken", state.userToken)

        // save userDetails in local storage
        localStorage.setItem("userDetails", JSON.stringify(state.userDetails))

        localStorage.setItem("isAuth", state.isAuth)

        // automatically logout the user after one hour
        setTimeout(() => {
          state.userToken = "";
          state.isAuth = false;
          router.replace("/login")
        }, 3600000)
      }
      catch(err){
        console.log(err.message);
        state.loadingContent = false;
        state.isError = true
        state.errorMessage = "Invalid username or password"
      }
    },

     /**
      * Attempt to persist the user login status when the application is created  
      * This will only be successful if the user token has not expired
      **/

     m_autoLogin(state) {
      const userToken = localStorage.getItem("userToken")
      const userDetails = JSON.parse(localStorage.getItem("userDetails"))
      const expiryDate = localStorage.getItem("expiryDate")
      const isAuth= localStorage.getItem("isAuth")
      const now = new Date().getTime()
      const expirationTime = new Date(expiryDate).getTime()


      // Check if useroken has expired
      if(now >= expirationTime) {
        return 
      } else {
        state.userToken = userToken
        state.isAuth = isAuth
        state.userDetails = userDetails
      }
    },

    m_logout(state) {
      state.userToken = ""
      state.isAuth = false
      localStorage.removeItem("userToken")
      localStorage.removeItem("userDetails")
      localStorage.removeItem("expiryDate")
      localStorage.removeItem("isAuth")
      router.replace("/login")
    },
  },

  actions: {
    //This action will be dispatched after the login button has been clicked
    a_login({commit}) {
      commit("m_login")
    },

    // This action will be dispatched in the created lifecycle hook of App.vue
    a_autoLogin({commit}) {
      commit("m_autoLogin")
    },

    // This action will be dispatched after th logout button has been clicked
    a_logout({commit}) {
      commit("m_logout")
    }
  },
  modules: {
  }
})
