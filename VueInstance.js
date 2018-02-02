const app = new Vue ( {
	store,
	data: {
		mainDataSource: "./data/mainData.json",
		postDataSource: "./data/posts.json",
		users: usersRef,
		messages: messagesRef,
		newMessage: {},
		firebaseUser: null,
		loginForm: false,
		firebaseAuthObject: null,
		dialog: false,
		alert: false,
		alertMessage: "",
		alertColor: "info",
		alertIcon: "textsms",
		authUI: null,
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
	},
	watch: {
		firebaseAuthObject: function ( val ) {
			console.log ( 'WATCH: firebaseAuthObject changed: ', val )
			
			this.firebaseUser = val.currentUser
			console.log ( 'WATCH: firebaseUser: ', this.firebaseUser )
		},
		alertMessage: function ( val ) {
			this.alert = !!val
		}
	},
	computed: Vuex.mapGetters ([
			'mainMenuReady',
			'mainMenuItems',
			'sectionIsReady',
			'sectionMenu',
	]),
	created: function () {
		this.authUI = new firebaseui.auth.AuthUI( firebase.auth() )
		this.firebaseAuthObject = firebase.auth()
		this.firebaseUser = this.firebaseAuthObject.currentUser
		console.log ( 'CREATED: firebaseAuthObject: ', this.firebaseUser )
		console.log ( 'CREATED: firebaseUser: ', this.firebaseUser )
		
		this.$http.get ( this.mainDataSource )
			.then ( response => {
					this.$store.commit ( 'getMainData', response.body )
			})
		this.$http.get ( this.postDataSource )
			.then ( response => {
					this.$store.commit ( 'getPostData', response.body )
			})
	},
	mounted: function () {
		console.log ( 'LoginComponent: ', LoginComponent )
		console.log ( 'WIDGET CONTAINER: ', document.getElementById ( 'firebaseui-auth-container' ) )
		this.authUI.start( '#firebaseui-auth-container', this.uiConfig )
		console.log ( 'MOUNTED: firebaseAuthObject ', this.firebaseAuthObject )
		console.log ( 'MOUNTED: firebaseUser ', this.firebaseUser )
		
		firebase.auth().onAuthStateChanged ( function ( user ) {
			console.log ( 'firebase.auth().onAuthStateChanged: ', this )
			user.getIdToken().then ( 
				accessToken => {
					console.info ( 'accessToken: ' + accessToken )
				},
				error => {
					console.error ( 'accessToken ERROR ' + error )
				}
			)
		})
		this.$vuetify.theme = {
      			primary: '#36465d',
      			secondary: '#005d40',
      			accent: '#9b03a5',
      			error: '#d00',
      			info: '#09a',
      			success: '#048a4d',
      			warning: '#fa0',
      			transparent: "transparent",
			glass: 'rgba(255,255,255,0.4)'
    		}
	},
	methods: {
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
		sendMessage: function () {
       			messagesRef.push ( this.newMessage )
       			this.newMessage.time = new Date ()
       			this.newMessage.text = 'Новое сообщение'
       			this.newMessage.user = 'Администратор'
    		},
		gotoAbout: function () {
      			this.$root.$router.push ( { name: "about", props: true } )
    		},
    		gotoDetails: function () {
      			this.$root.$router.push ( { name: "details", props: true } )
    		},
	},
	components: {
		'dropdown-menu': CustomSelect,
		MainSection,
		SendMessage,
		'login-component': LoginComponent,
		'nav-panel': NavigationPanel,
		'toggle-buttons': ToggleButtons,
		'app-footer': appFooter
	},
	router,
}).$mount ( '#VueCourseware' )
