
const LoginComponent = ( 'login-component', {
	data: function () {
		return {
			__route: null,
			authUI: null,
			firebaseAuthObject: null,
			uiConfig: {
				callbacks: {
					signInSuccess: ( currentUser, credential, redirectUrl ) => {
						this.$root.$store.commit ( 'setCurrentUser', currentUser )
						var loginWidget = document.getElementById ( "firebaseui-auth-container" )
						if ( loginWidget ) loginWidget.parentNode.removeChild ( loginWidget )
						this.$root.$emit ( 'closeCurrentDialog' )
						return true
					},
					uiShown: function() {
						console.info ( 'The widget is rendered' )
					}
				},
				// Will use popup for IDP Providers sign-in flow instead of the default, redirect
				signInFlow: 'popup',
				signInSuccessUrl: '/vue-course.github.io/#/' + this.__route,
				signInOptions: [
					firebase.auth.GoogleAuthProvider.PROVIDER_ID,
					firebase.auth.TwitterAuthProvider.PROVIDER_ID,
					firebase.auth.GithubAuthProvider.PROVIDER_ID,
					firebase.auth.EmailAuthProvider.PROVIDER_ID,
				],
				tosUrl: '/vue-course.github.io/#' + this.__route
			}
		}
	},
	computed: {
		user: function () {
			return this.$root.$store.user
		}
	},
	watch: {
		firebaseAuthObject: val => { console.log ( 'LoginComponent watch firebaseAuthObject: ', val ) },
		user: val => { console.log ( 'LoginComponent watch user: ', val ) },
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
		console.log ( 'this.$route.path: ', this.$route.path )
	},
	methods: {
		sendCloseEvent: function () {
			var loginWidget = document.getElementById ( "firebaseui-auth-container" )
			if ( loginWidget ) loginWidget.parentNode.removeChild ( loginWidget )
          		this.$root.$emit ( 'closeCurrentDialog' )
      		},
	},
	mounted: function () {
		this.__route = this.$route.path
		console.log ( 'this.__route: ', this.__route )
		if ( this.user ) {
			console.info ( 'User allready signed in' )
			console.log ( this.user )
		}
		else {
			var loginWidget = document.createElement ( 'figure' )
			document.body.appendChild ( loginWidget )
			loginWidget.id = "firebaseui-auth-container"
			this.$root.authUI.start( '#firebaseui-auth-container', this.uiConfig )
			console.log ( 'LoginComponent this.authUI: ', this.$root.authUI )
		}
	}
})
