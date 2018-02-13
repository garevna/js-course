
const LoginComponent = ( 'login-component', {
	data: function () {
		return {
			authUI: null,
			firebaseAuthObject: null,
			uiConfig: {
				callbacks: {
					signInSuccess: ( currentUser, credential, redirectUrl ) => {
						console.log ( "======== Sign In Success =======" )
						console.log ( "THIS: ", this )
						console.log ( 'Current User: ', currentUser )
						console.log ( 'credential: ', credential )
						this.$root.$store.commit ( 'setCurrentUser', currentUser )
						var loginWidget = document.getElementById ( "firebaseui-auth-container" )
						if ( loginWidget ) loginWidget.parentNode.removeChild ( loginWidget )
						// User successfully signed in
						// Return type determines whether we continue the redirect automatically
						// or whether we leave that to developer to handle
						return true
					},
					uiShown: function() {
						console.info ( 'The widget is rendered' )
					}
				},
				// Will use popup for IDP Providers sign-in flow instead of the default, redirect
				signInFlow: 'popup',
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
			return this.$root.$store.user
		}
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
		console.log ( 'this.$route.path: ', this.$route.path )
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
			var loginWidget = document.getElementById ( "firebaseui-auth-container" )
			if ( loginWidget ) loginWidget.parentNode.removeChild ( loginWidget )
          		this.$root.$emit ( 'closeCurrentDialog' )
      		},
	},
	mounted: function () {
		if ( this.currentUser ) {
			console.info ( 'User allready signed in' )
			console.log ( this.currentUser )
		}
		else {
			var loginWidget = document.createElement ( 'figure' )
			document.body.appendChild ( loginWidget )
			loginWidget.id = "firebaseui-auth-container"
			this.authUI.start( '#firebaseui-auth-container', this.uiConfig )
			console.log ( 'LoginComponent this.authUI: ', this.authUI )
		}
	}
})
