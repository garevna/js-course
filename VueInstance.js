// Vue.config.silent = true
const app = new Vue ( {
	store,
	data: {
		mainDataSource: "./data/mainData.json",
		postDataSource: "./data/posts.json",
		users: usersRef,
		messages: messagesRef,
		newMessage: {},
		firebaseUser: firebase.auth().currentUser,
		loginForm: false,
		firebaseAuthObject: firebase.auth()
	},
	watch: {
		firebaseAuthObject: function ( val ) {
			console.log ( 'VUE instance: firebaseAuthObject changed: ', val )
		}
	},
	computed: Vuex.mapGetters ([
			'mainMenuReady',
			'mainMenuItems',
			'sectionIsReady',
			'sectionMenu',
	]),
	created: function () {
		this.firebaseUser = firebase.auth().currentUser
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
		console.log ( 'VUE instance: firebaseAuthObject ', this.firebaseAuthObject )
		console.log ( '*** ', this.firebaseAuthObject.currentUser )
		console.log ( '### ', Firebase.Auth.FirebaseAuth.DefaultInstance )
		//public void addAuthStateListener ( function ( user ) {
		//	if ( user ) {
		//		console.log ( 'VUE instance: provider data: ', user.providerData )
		//		this.firebaseUser = user.providerData
		//		console.log ( 'VUE instance: this.firebaseUser: ', this.firebaseUser )
		//	} else {
		//		console.warn ( 'VUE instance: provider data: no user signed in' )
		//		// No user is signed in.
		//	}
		//})
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
			firebase.auth().signOut().then ( function() {
				this.firebaseUser = null
			}).catch ( function ( error ) {
				console.error ( 'Ошибка: ', error )
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
		'nav-panel': NavigationPanel,
		'toggle-buttons': ToggleButtons,
		'app-footer': appFooter
	},
	router,
}).$mount ( '#VueCourseware' )
