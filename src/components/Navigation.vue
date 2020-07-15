<template>
    <div>
        <v-app-bar 
            app 
            color="#FFFFFF"
        >
            <v-toolbar-title class="#3888D7--text">
                <v-btn text color="#3888D7" to="/">
                    <div class="hide-home-icon mx-2">
                        <v-icon color="#3888D7"> mdi-home</v-icon>
                    </div>
                    <span>IderaOS</span>
                </v-btn>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn text color="#3888D7" to="/login" v-if="!$store.state.isAuth">
                <div class="hide-icon">
                    <v-icon>mdi-login</v-icon>
                </div>
                <span>Login</span>
            </v-btn>

            <v-btn text color="#3888D7" to="/register" v-if="!$store.state.isAuth">
               <div class="hide-icon">
                    <v-icon>mdi-account-outline</v-icon>
                </div>
                <span>Register</span>
            </v-btn>

            <v-btn text color="#3888D7" to="/dashboard" v-if="$store.state.isAuth">
               <div>
                    <v-icon>mdi-view-dashboard</v-icon>
                </div>
                <span class="hide-icon">Dashboard</span>
            </v-btn>

            <v-btn text color="#3888D7" v-if="$store.state.isAuth" @click="logout">
               <div>
                    <v-icon>mdi-logout</v-icon>
                </div>
                <span class="hide-icon">Logout</span>
            </v-btn>

        </v-app-bar>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch("a_logout")
        }
    }
}
</script>

<style scoped>
    @media (max-width: 420px) {
        .hide-icon {
            display: none;
        }
    }
    @media (max-width: 390px) {
        .hide-home-icon {
            display: none;
        }
    }
</style>

