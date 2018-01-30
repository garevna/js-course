// Vue.config.silent = true
const app = new Vue ( {
	store,
	data: {
		mainDataSource: "./data/mainData.json",
		postDataSource: "./data/posts.json",
		users: usersRef,
		messages: messagesRef,
		newMessage: {}
	},
	computed: {
		localComputed () {
			currentSectionId: () => this.$store.currentSectionId
		}
	},
	computed: Vuex.mapGetters ([
			'mainMenuReady',
			'mainMenuItems',
			'sectionIsReady',
			'sectionMenu',
	]),
	created: function () {
			//firebase.auth().onAuthStateChanged ( firebaseUser => {
			//		firebaseUser ? store.dispatch ('autoSignIn', firebaseUser ) : return
			//})
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
		//this.winResize ()
		//window.addEventListener ( 'resize', this.winResize )
	},
	methods: {
		sendMessage: function () {
       messagesRef.push ( this.newMessage )
       this.newMessage.time = new Date ()
       this.newMessage.text = 'Новое сообщение'
       this.newMessage.user = 'Администратор'
    },
		//winResize: function ( event ) {
		//	var asp = window.innerWidth / window.innerHeight
		//	document.body.style.backgroundPosition = "center top"
		//	document.body.style.backgroundSize = Math.min ( window.innerHeight, window.innerWidth )*1.4 + "px"
		//	document.body.style.backgroundPositionY = ( asp <= 1.1 && asp >= 0.9 ) ?
		//				"10%" : ( asp < 0.9 ? ( -10 / asp ) + "%" : "10%" )
		//},
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
