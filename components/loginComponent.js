const LoginComponent = ( 'login-component', {
    data: function () {
        return {
            authUI: null,
            firebaseAuthObject: null,
            dialog: false,
            loginForm: false,
		    alert: false,
		    alertMessage: "",
		    alertColor: "info",
		    alertIcon: "textsms",
            uiConfig: {
			    signInSuccessUrl: '/vue-course.github.io/#/',
			    signInOptions: [
				    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
				    firebase.auth.GithubAuthProvider.PROVIDER_ID,
				    firebase.auth.EmailAuthProvider.PROVIDER_ID,
        		],
        		// Terms of service url
        		tosUrl: '/vue-course.github.io/'
		    }
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
    watch: {
        firebaseAuthObject: val => { console.log ( 'LoginComponent watch firebaseAuthObject: ', val ) },
        currentUser: val => { console.log ( 'LoginComponent watch currentUser: ', val ) },
    },
    template: `
        <v-layout row justify-center v-if = "firebaseAuthObject">  
             <v-dialog v-model = "dialog" max-width = "290">
                <v-btn color = "primary" 
                       dark icon
                       v-if = "currentUser"
                       slot = "activator"
                       @click.native.stop = "dialog = true">
                    <v-avatar size = "36px" 
                              v-if = "currentUser.photoURL">
                         <img :src = "currentUser.photoURL" 
                              :alt = "currentUser.displayName">
                    </v-avatar>
                    <v-icon v-else>person</v-icon>
                </v-btn>
                <v-card v-if = "currentUser">
                          <v-card-title class = "headline"
                                        v-text = "currentProvider">
                          </v-card-title>
                          <v-card-text v-text = "currentUser.displayName"></v-card-text>
                          <v-card-text v-text = "currentUser.email"></v-card-text>
                          <v-card-text v-text = "currentUser.phoneNumber"></v-card-text>
                          <v-card-text v-text = "currentUser.metadata.lastSignInTime"></v-card-text>
                                
                          <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn  flat = "flat" 
                                            @click.native = "dialog = false">
                                        Close
                                    </v-btn>
                                    <v-btn  flat = "flat"
                                            @click.native = "dialog = false; userLogOut">
                                        Sign out
                                    </v-btn>
                          </v-card-actions>
                </v-card>
             </v-dialog>
        </v-layout>
                
        <v-btn color = "primary" dark icon
                           v-if = "!currentUser"
                           @click.native.stop = "loginForm = true">
               <v-icon v-else>perm_identity</v-icon>
        </v-btn>
        <div id = "firebaseui-auth-container" v-show = "loginForm"></div>
    `,
    methods: {
        userLogIn: function () {
            this.authUI.start( '#firebaseui-auth-container', this.uiConfig )
        },
        userLogOut: function () {
			var alertMessage = ""
			var alertColor = ""
			var alertIcon = ""
			var res = null
			firebase.auth().signOut().then ( function ( result ) {
				console.log ( 'SIGN OUT: result: ', result )
				res = "success"
				alertMessage = "Вы успешно вышли из своего аккаунта"
				alertColor = "info"
				alertIcon = "warning"
			}).catch ( function ( error ) {
				console.error ( 'SIGN OUT: Ошибка: ', error )
				console.log ( 'SIGN OUT: firebaseUser: ', this.firebaseUser )
				console.log ( 'SIGN OUT: firebaseAuthObject: ', this.firebaseAuthObject )
				res = "failure"
				alertMessage = "Не удалось выйти из аккаунта"
				alertColor = "error"
				alertIcon = "error"
			})
		},
    },
    created: function () {
        console.info ( 'Login component has been created' )
        const authUI = new firebaseui.auth.AuthUI( firebase.auth() )
        this.firebaseAuthObject = firebase.auth()
        this.firebaseAuthObject.onAuthStateChanged ( function ( user ) {
		console.log ( 'firebase.auth().onAuthStateChanged' )
		this.$root.$store.commit ( 'userLoginSuccess', user )
		console.log ( 'THIS: ', this )
		if ( user ) {
			user.getIdToken().then ( 
				accessToken => {
					console.log ( 'USER: ', user)
					console.log ( 'THIS: ', this )
					this.$root.$store.commit ( 'userLoginSuccess', user )
				},
				error => {
					console.error ( 'accessToken ERROR ' + error )
					this.$root.$store.commit ( 'userLoginError', user )
				}
			)
		}
		else this.$root.$store.commit ( 'userLogOut' )
        })
    },
    mounted: function () {
        console.info ( 'Login component has been mounted' )
        this.authUI.start( '#firebaseui-auth-container', this.uiConfig )
        console.log ( 'LoginComponent this.authUI: ', this.authUI )
    }
})
