const app = new Vue ( {
	store,
	data: {
		mainDataSource: "./data/mainData.json",
		postDataSource: "./data/posts.json",
	},
	computed: Vuex.mapGetters ([
			'mainMenuReady',
			'mainMenuItems',
			'sectionIsReady',
			'sectionMenu',
	]),
	created: function () {
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
	},
	methods: {
		
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
