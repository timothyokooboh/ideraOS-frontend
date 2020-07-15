<template>
    <div>
        <!-- Flash message to show if registration is successful -->
        <v-snackbar 
            top
            v-model="$store.state.isRegistrationSuccessful" 
            :timeout="6000" 
            color="#3888D7"
        >
            Congratulaions! You sucessfully signed up
        </v-snackbar>

        <!-- Flash message to show if username or password is invalid -->
        <v-snackbar 
            top
            v-model="$store.state.isError" 
            :timeout="6000" 
        >
            {{$store.state.errorMessage}}
        </v-snackbar>
        
        <v-container>
            <v-card flat max-width="500px" class="mx-auto" shaped>
                <v-card-title class="mx-5 my-3" style="letter-spacing: 1.08px">SIGN IN TO CONTINUE</v-card-title>
                <v-card-text>
                    <v-form class="mx-5" ref="form">
    
                        <v-text-field
                            label="Username"
                            append-icon="mdi-account-outline"
                            v-model="$store.state.username"
                            :rules="formRules"
                            outlined
                            shaped
                        >
                        </v-text-field>

                        <v-text-field
                            label="Password"
                            type="password"
                            append-icon="mdi-key"
                            v-model="$store.state.password"
                            :rules="passwordRules"
                            outlined
                            shaped
                        >
                        </v-text-field>

                        <v-btn 
                            width="100%" 
                            :loading="$store.state.loadingContent"
                            @click="submit"
                            class="my-3 white--text"
                            color="#3888D7"
                        >
                            login
                        </v-btn>

                        <div class="py-2">
                            Don't have an account? <router-link to="/register">Register</router-link>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>

export default {
    data() {
        return {
            username: "",
            password: "",
            formRules: [
                v => !!v || "This field is required"
            ],
            passwordRules: [
                v => !!v || "Password is required",
                v => v.length >= 8 || "Password must have at least 8 characters"
            ],
        }
    },

    methods: {
        submit() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch("a_login")
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