<template>
    <div>
        <v-container>
            <v-snackbar
                color="#3888D7"
                top
                :timeout="8000"
                v-model="snackbar"
            >
                Profile updated successfully
            </v-snackbar>

            <v-snackbar
                top
                :timeout="8000"
                v-model="errorSnackbar"
            >
                {{error}}
            </v-snackbar>

            <h1>
                Welcome {{user.userDetails.username}}
            </h1>

            <div class="my-5">
                <v-avatar size="100" v-if="!imageSrc">
                    <v-img src="person.jpg"></v-img>
                </v-avatar> 

                <v-avatar size="100">
                    <v-img :src="imageSrc"></v-img>
                </v-avatar>

                <div class="my-3">
                    <span class="font-weight-bold">First name</span> {{firstName}}
                </div>
                <div class="my-3">
                    <span class="font-weight-bold">Last name</span> {{lastName}}
                </div>
                <div class="my-3">
                    <span class="font-weight-bold">Email: </span> {{email}}
                </div>
                <div class="my-3">
                    <span class="font-weight-bold">Occupation: </span> {{occupation}}
                </div>
                <div class="my-3">
                    <span class="font-weight-bold">Location: </span> {{location}}
                </div>
            </div>

            <v-dialog
                v-model="dialog"
            >
                <template v-slot:activator="{on}">
                    <v-btn 
                        color="#3888D7" 
                        v-on="on" 
                        @click="dialog =! dialog"
                        class="mt-5 white--text"
                    >
                        Click here to update your profile
                    </v-btn>
                </template>
                <v-card>
                    
                    <v-card-title>Update Your Profile</v-card-title>
                    <v-card-text>
                        <v-form class="ma-5">
                            <v-text-field
                                label="First Name"
                                append-icon="mdi-account-outline"
                                v-model="firstName"
                            >
                            </v-text-field>

                            <v-text-field
                                label="Last Name"
                                append-icon="mdi-account-outline"
                                 v-model="lastName"
                            >
                            </v-text-field>

                            <v-text-field
                                label="Email"
                                append-icon="mdi-email"
                                 v-model="email"
                            >
                            </v-text-field>

                            <v-text-field
                                label="Occupation"
                                append-icon="mdi-account-network"
                                v-model="occupation"
                            >
                            </v-text-field>

                            <v-text-field
                                label="Location"
                                append-icon="mdi-map-marker"
                                v-model="location"
                            >
                            </v-text-field>

                            <v-file-input  
                                id="file"
                                @change="handleFileUpload"
                                ></v-file-input>

                            <v-btn 
                                width="100%" 
                                :loading="loadingContent"
                                @click="update"
                                class="my-3 white--text"
                                color="#3888D7"
                            >
                                Update Profile
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>

        </v-container>
    </div>
</template>

<script>
import ProfileDataService from "../services/ProfileDataService"

export default {
    data() {
        return {
            dialog: false,
            firstName: "",
            lastName: "",
            username:"",
            email: "",
            imageSrc: "",
            occupation: "",
            location: "",
            userProfile: [],
            error: "",
            file: "",
            loadingContent: false,
            snackbar: false,
            errorSnackbar: false
        }
    },

    computed: {
        user() {
            return this.$store.state.userDetails
        }
    },

    methods: {
        handleFileUpload() {
            const image = document.querySelector("#file")
            this.file = image.files[0]
            console.log(this.file)
        },

        async update() {

            this.loadingContent = true;

            const formData = new FormData()

            if (this.file !== "" ) {
                formData.append("image", this.file)
            }

            formData.set("firstName", this.firstName)
            formData.set("lastName", this.lastName)
            formData.set("email", this.email)
            formData.set("occupation", this.occupation)
            formData.set("location", this.location)
            formData.set("imageSrc", this.imageSrc)
            formData.set("username", this.userProfile[0].username)
            formData.set("userId", this.userProfile[0].user._id)

            try {
                const saveProfile = await ProfileDataService.update(formData)
                console.log(saveProfile)
                this.loadingContent = false
                this.snackbar = true
                this.dialog = false

                // Update the webpage with the current profile details
                this.fetchUserProfile()
            }
            catch(err) {
                console.log(err)
                this.loadingContent = false
                this.error = "There was an error updating your profile. Please try again"
                this.errorSnackbar = true
                this.dialog = false
            }

        },
        fetchUserProfile() {
            ProfileDataService.show()
            .then((res) => {
                //console.log(res.data)
                // get only the user's profile
                this.userProfile = res.data.filter((val) => {
                    return val.username === this.user.userDetails.username
                })
                this.firstName = this.userProfile[0].firstName
                this.username = this.userProfile[0].username
                this.lastName = this.userProfile[0].lastName
                this.email = this.userProfile[0].email
                this.occupation = this.userProfile[0].occupation
                this.location = this.userProfile[0].firstName
                this.imageSrc = this.userProfile[0].profilePicture
                console.log(this.userProfile)
                console.log(this.userProfile[0].username)
            })
            .catch((err) => {
                this.error = "There was an error getting your profile details. Try refreshing the page"
                console.log(err)
            })
        }
    },

    mounted() {
        this.fetchUserProfile()
    }
}
</script>