'use strict'

const UserInfo = {
    data: function () {
        return {
            dialog: false
	      }
    },
    computed: {
        user: function () {
                return this.$root.$store.state.user
        }
    },
    template: `
       <v-dialog v-model = "dialog" max-width = "290" v-if = "user">
                <v-btn color = "primary"
                       dark icon
                       slot = "activator"
                       @click.native.stop = "dialog = true">
                    <v-avatar size = "36px"
                              v-if = "user.photoURL">
                         <img :src = "user.photoURL"
                              :alt = "user.displayName">
                    </v-avatar>
                    <v-icon v-else>person</v-icon>
                </v-btn>
                <v-card v-if = "user">
                          <v-card-title class = "headline warning--text"
                                        v-text = "user.provider">
                          </v-card-title>
                          <v-card-text v-text = "user.name"></v-card-text>
                          <v-card-text v-text = "user.email"></v-card-text>
                          <v-card-text v-text = "user.phoneNumber"></v-card-text>
                          <v-card-text v-text = "user.lastSignInTime"></v-card-text>
                          <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  flat = "flat"
                                            @click.native = "dialog = false">
                                        Close
                                    </v-btn>
                                    <v-btn  flat = "flat"
                                            @click.native = "userLogOut">
                                        Sign out
                                    </v-btn>
                          </v-card-actions>
                </v-card>
        </v-dialog>
    `,
    methods: {
        userLogOut: function () {
            this.dialog = false
            var alertMessage = ""
            var alertColor = ""
            var alertIcon = ""
            var res = null
            firebase.auth().signOut()
                .then ( function ( result ) {
                      console.log ( 'SIGN OUT: result: ', result )
                      res = "success"
                      alertMessage = "Вы успешно вышли из своего аккаунта"
                      alertColor = "info"
                      alertIcon = "warning"
			          })
                .catch ( function ( error ) {
                      console.error ( 'SIGN OUT: Ошибка: ', error )
                      console.log ( 'SIGN OUT: firebaseUser: ', this.firebaseUser )
                      console.log ( 'SIGN OUT: firebaseAuthObject: ', this.firebaseAuthObject )
                      res = "failure"
                      alertMessage = "Не удалось выйти из аккаунта"
                      alertColor = "error"
                      alertIcon = "error"
                })
            this.$root.$store.commit ( 'userLogOut' )
        },
    }
}

export default UserInfo
