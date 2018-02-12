
const LoginComponent = ( 'login-component', {
	data: function () {
		return {
			authUI: null,
			firebaseAuthObject: null,
			uiConfig: {
				signInSuccessUrl: '/vue-course.github.io/#/',
				signInOptions: [
					firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					firebase.auth.TwitterAuthProvider.PROVIDER_ID,
					firebase.auth.GithubAuthProvider.PROVIDER_ID,
					firebase.auth.EmailAuthProvider.PROVIDER_ID,
				],
				tosUrl: '/vue-course.github.io/'
			}
		}
	},
	computed: {
		currentUser: function () {
			if ( this.firebaseAuthObject )
				return this.firebaseAuthObject.currentUser
			else return null
		},
		currentProvider: function () {
			if ( this.firebaseAuthObject && this.firebaseAuthObject.currentUser )
				var user = this.firebaseAuthObject.currentUser
				if ( user.providerData ) return user.providerData[0].providerId
			else return null
		},
	},
	watch: {
		firebaseAuthObject: val => { console.log ( 'LoginComponent watch firebaseAuthObject: ', val ) },
		currentUser: val => { console.log ( 'LoginComponent watch currentUser: ', val ) },
	},
	template: `
        	<v-layout row justify-center>  
            		<v-btn  icon dark class = "transparent"
                      		@click.native = "sendCloseEvent">
                		<v-icon> close </v-icon>
              		</v-btn>
        	</v-layout>`,
	created: function () {
		console.info ( 'Login component has been created' )
		this.authUI = new firebaseui.auth.AuthUI( firebase.auth() )
		this.firebaseAuthObject = firebase.auth()
		const __this = this
		this.firebaseAuthObject.onAuthStateChanged ( function ( user ) {
			console.log ( 'firebase.auth().onAuthStateChanged' )
			if ( user ) {
				user.getIdToken().then ( 
					accessToken => {
						console.log ( 'USER: ', user)
						__this.$root.$store.commit ( 'userLoginSuccess', user )
					},
					error => {
						console.error ( 'accessToken ERROR ' + error )
						__this.$root.$store.commit ( 'userLoginError', user )
					}
				)
			}
			else __this.$root.$store.commit ( 'userLogOut' )
		})
	},
	methods: {
		sendCloseEvent: function () {
          		this.$root.$emit ( 'closeCurrentDialog' )
      		},
	},
	mounted: function () {
		console.info ( 'Login component has been mounted' )
		this.loginForm = true
		var loginWidget = document.createElement ( 'figure' )
		document.body.appendChild ( loginWidget )
		loginWidget.id = "firebaseui-auth-container"
		console.log ( loginWidget )
		this.authUI.start( '#firebaseui-auth-container', this.uiConfig )
		console.log ( 'LoginComponent this.authUI: ', this.authUI )
	}
})
