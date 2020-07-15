<template>
    <div>
        <v-snackbar
            top
            :timeout="5000"
            v-model= $store.state.isError
        >
            {{$store.state.errorMessage}}
        </v-snackbar>
        <v-container>
            <v-card flat max-width="500px" class="mx-auto" shaped>
                <v-card-title class="mx-5 my-3" style="letter-spacing: 1.08px">SIGN UP TO GET STARTED</v-card-title>
                <v-card-text>
                    <v-form class="mx-5" ref="form">
    
                        <v-text-field
                            label="Username"
                            append-icon="mdi-account-outline"
                            v-model="username"
                            :rules="formRules"
                            outlined
                            shaped
                        >
                        </v-text-field>

                        <v-text-field
                            label="Password"
                            type="password"
                            append-icon="mdi-key"
                            v-model="password"
                            :rules="passwordRules"
                            outlined
                            shaped
                        >
                        </v-text-field>
                        <v-text-field
                            label="Repeat Password"
                            type="password"
                            append-icon="mdi-key"
                            v-model="passwordRepeat"
                            :rules="passwordConfirmation"
                            outlined
                            shaped
                        >
                        </v-text-field>

                        <v-btn 
                            width="100%" 
                            :loading="loadingContent"
                            @click="submit"
                            class="my-3 white--text"
                            color="#3888D7"
                        >
                            Register
                        </v-btn>

                        <div class="py-2">
                            Already have an account? <router-link to="/login">Login</router-link>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import AuthDataService from "../services/AuthDataService"

export default {
    data() {
        return {
            loadingContent: false,
            username: "",
            password: "",
            passwordRepeat: "",
            formRules: [
                v => !!v || "This field is required"
            ],
            passwordRules: [
                v => !!v || "Password is required",
                v => v.length >= 8 || "Password must have at least 8 characters"
            ],
            passwordConfirmation: [
                v => v === this.password || "Passwords don't match"
            ]
        }
    },

    methods: {
        async submit() {
            if(this.$refs.form.validate()) {

                this.loadingContent = true

                try {
                    const postUser = await AuthDataService.register({
                        username: this.username,
                        password: this.password
                    })
                    console.log(postUser.data)
                    this.loadingContent = false
                    this.$store.state.isRegistrationSuccessful = true
                    this.$router.replace("/login")
                }
                catch(err) {
                    console.log(err)
                    this.$store.state.isError = true
                    this.$store.state.errorMessage = "Something went wrong. The username is probably taken"
                    this.loadingContent = false
                }
            }
        }

    }
}
</script>

<style scoped>
    a {
        text-decoration: none;
    }
</style>