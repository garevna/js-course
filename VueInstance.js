const app = new Vue ( {
	store,
	data: {
		mainDataSource: "data/mainData.json",
		postDataSource: "data/posts.json",
		usersDBref: null,
		messagesDBref: null,
		newMessage: {},
		lastMessages: null,
		currentUser: null,
		chatDialog: false,
		userInfoDialog: false,
		userLoginDialog: false,
		userLogoutDialog: false
	},
	computed: {
			currentDate: function () { return this.$store.state.messagesDate },
			currentSectionId: function () { return this.$store.state.currentSectionId },
			mainMenuReady: function () { return this.$store.getters.mainMenuReady },
			mainMenuItems: function () { return this.$store.getters.mainMenuItems },
			sectionIsReady: function () { return this.$store.getters.sectionIsReady },
			sectionMenu: function () { return this.$store.getters.sectionMenu }
	},
	created: function () {
		this.$http.get ( this.mainDataSource )
				.then ( response => {
					console.log ( response.body )
					this.$store.commit ( 'getMainData', response.body )
		})
		this.$http.get ( this.postDataSource )
				.then ( response => {
					console.log ( response.body )
					this.$store.commit ( 'getPostData', response.body )
		})
		const config = {
					apiKey: "AIzaSyAE1LDfl-AWDIaauE6CUGWPDvJU4sdDnLE",
					authDomain: "vue-course-b1571.firebaseapp.com",
					databaseURL: "https://vue-course-b1571.firebaseio.com",
					projectId: "vue-course-b1571",
					storageBucket: "vue-course-b1571.appspot.com",
					messagingSenderId: "329391650263"
		}
		if ( !firebaseApp ) const firebaseApp = firebase.initializeApp ( config )
		if ( !firebaseDB ) const firebaseDB = firebaseApp.database()
		console.log ( 'const firebaseApp', firebaseApp )
		console.log ( 'const firebaseDB', firebaseDB )
		
		this.usersDBref = firebaseDB.ref ( 'users' )
		this.messagesDBref = firebaseDB.ref ( 'message' )

		console.log ( 'firebaseApp usersRef: ', this.usersDBref )
		console.log ( 'firebaseApp messagesRef: ', this.messagesDBref )

			
	},
	mounted: function () {
		this.$store.commit ( 'changeMessagesData', new Date() )
		this.$on ( 'closeCurrentDialog', function () {
				this.chatDialog = false
				this.userInfoDialog = false
				this.userLoginDialog = false
				this.userLogoutDialog = false
		} )
		this.$vuetify.theme = {
			primary: '#36465d',
			//secondary: '#266150',
			secondary: '#4a8272',
			accent: '#9b03a5',
			error: '#d00',
			info: '#09a',
			success: '#266150',
			warning: '#fa0',
			transparent: "transparent",
			glass: 'rgba(255,255,255,0.4)'
		}
	},
	methods: {
		startUserLogin: function () {
			this.userLoginDialog = true
		},
		startUserLogOut: function () {
			this.userLogoutDialog = true
		},
		startUserInfo: function () {
			this.userInfoDialog = true
		},
		startChat: function () {
			this.chatDialog = true
		},
	},
	components: {
		LoginComponent,
		'dropdown-menu': CustomSelect,
		MainSection,
		'full-screen-chat': FullScreenChat,
		'nav-panel': NavigationPanel,
		'toggle-buttons': ToggleButtons,
		'app-footer': appFooter
	},
	router,
}).$mount ( '#VueCourseware' )
