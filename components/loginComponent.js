const LoginComponent = ( 'login-component', {
    data: function () {
        return {
            dialog: false,
            loginForm: false
        }
    },
    computed: {
        firebaseAuthObject: function () {
            return this.$root.firebaseAuthObject
        },
        currentUser: function () {
            if ( this.$root.firebaseAuthObject )
                return this.$root.firebaseAuthObject.currentUser
            else return null
        },
        currentProvider: function () {
            if ( this.$root.firebaseAuthObject && this.$root.firebaseAuthObject.currentUser )
                var user = this.$root.firebaseAuthObject.currentUser
                if ( user.providerData ) return user.providerData[0].providerId
            else return null
        },
    },
    template: `
        <v-layout row justify-center v-if = "firebaseAuthObject">
                    <v-btn color = "primary" 
                           dark icon
                           v-if = "currentUser"
                           @click.native.stop = "dialog = true">
                        <v-avatar size = "36px" 
                                  v-if = "currentUser.photoURL">
                            <img :src = "currentUser.photoURL" 
                                 :alt = "currentUser.displayName">
                        </v-avatar>
                        <v-icon v-else>person</v-icon>
                    </v-btn>
                    
                    <v-dialog v-model = "dialog" max-width = "290">
                            <v-card>
                                <v-card-title class = "headline"
                                              v-text = "currentUser.providerData[0].providerId">
                                </v-card-title>
                                <v-card-text v-text = "firebaseAuthObject.currentUser.displayName"></v-card-text>
                                <v-card-text v-text = "firebaseAuthObject.currentUser.email"></v-card-text>
                                <v-card-text v-text = "firebaseAuthObject.currentUser.phoneNumber"></v-card-text>
                                <v-card-text v-text = "firebaseAuthObject.currentUser.metadata.lastSignInTime"></v-card-text>
                                
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  color = "info darken-1" 
                                            flat = "flat" 
                                            @click.native = "dialog = false">
                                        Close
                                    </v-btn>
                                    <v-btn  color = "error darken-1" 
                                            flat = "flat" 
                                            @click.native = "dialog = false; userLogOut">
                                        Sign out
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                </v-layout>
                
                <v-btn color = "primary" 
                           dark icon
                           v-if = "!currentUser"
                           @click.native.stop = "loginForm = true">
                        <v-icon v-else>perm_identity</v-icon>
                </v-btn>
                <div id = "firebaseui-auth-container" v-show = "loginForm"></div>
    `,
    
})
