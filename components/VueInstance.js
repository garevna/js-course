'use strict'

import Vue from 'vue'

import VueResource from 'vue-resource'
Vue.use ( VueResource )

import Vuetify from 'vuetify'
Vue.use ( Vuetify )
import vuetifyCSS from '../node_modules/vuetify/dist/vuetify.min.css'

const firebaseConfig = {
	apiKey: "AIzaSyAE1LDfl-AWDIaauE6CUGWPDvJU4sdDnLE",
	authDomain: "vue-course-b1571.firebaseapp.com",
	databaseURL: "https://vue-course-b1571.firebaseio.com",
	projectId: "vue-course-b1571",
	storageBucket: "vue-course-b1571.appspot.com",
	messagingSenderId: "329391650263"
}
const firebaseApp = firebase.initializeApp ( firebaseConfig )
const firebaseDB = firebaseApp.database()
const firebaseAuthUI = new firebaseui.auth.AuthUI( firebase.auth() )

import googleFonts from '../css/googleFonts.css'

import LoginComponent from './loginComponent.esm.js'
import UserInfo from './userInfo'

import ToggleButtons from './toggleButtons'
import CustomSelect from './CustomSelect'
import MainSection from './mainSection'
import FullScreenChat from './FullScreenChat'
import NavigationPanel from './NavigationPanel'
import appFooter from './appFooter'
import QuizComponent from './QuizComponent'

import router from './routerInstance'
import store from './DataStore'

import rootCSS from '../css/root.css'
import mainCSS from '../css/main.css'
import forVuetify from '../css/forVuetify.css'
import scrolledPicture from '../css/scrolledPicture.css'

new Vue ( {
	store,
	router,
	data: function () {
		return {
			mainDataSource: "data/mainData.json",
			postDataSource: "data/posts.json",
			usersDBref: null,
			messagesDBref: null,
			newMessage: {},
			lastMessages: null,
			chatDialog: false,
			userLoginDialog: false,
			userLogoutDialog: false,
			drawer: null,
			perspectiveReady: false,
			quizReady: false,
			startQuiz: false,
			level: 1,
			mainQuizData: null,
			quizResults: {
	        score: 0,
	        lives: 0,
	        maxScore:0
	    }
		}
	},
	computed: {
		user: function () { return this.$store.state.user },
		userInfoDialog: function () { return !!this.user },
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
					this.$store.commit ( 'getMainData', response.body )
				})
				.catch ( err => {
					console.log ( 'ОШИБКА ', err )
				})
		this.$http.get ( this.postDataSource )
				.then ( response => {
					this.$store.commit ( 'getPostData', response.body )
				})
				.catch ( err => {
						console.log ( 'ОШИБКА ', err )
				})

		this.usersDBref = firebaseDB.ref ( 'users' )
		this.messagesDBref = firebaseDB.ref ( 'message' )

		const __vue = this
		firebase.auth().onAuthStateChanged ( function ( user ) {
			if ( !!user ) {
				user.getIdToken().then (
					accessToken => {
						__vue.$store.dispatch ( 'registerUser', user )
						//__vue.$store.dispatch ( 'getDataFromUsersDB' )
					},
					error => {
						console.error ( 'accessToken ERROR ' + error )
						__vue.$store.commit ( 'userLoginError', user )
					}
				)
			}
			else __vue.$store.commit ( 'userLogOut' )
		})
	},
	mounted: function () {
		this.$store.dispatch ( 'getAllUsers' )
		this.$store.commit ( 'changeMessagesData', new Date() )
		this.$on ( 'exit-quiz', function () {
				this.startQuiz = false
		} )
		this.$on ( 'closeCurrentDialog', function () {
				this.chatDialog = false
				this.userInfoDialog = false
				this.userLoginDialog = false
				this.userLogoutDialog = false
		} )
		this.$on ( 'navigation-drawer-state', function ( val ) {
			this.drawer = val
		})
		this.$vuetify.theme = {
			primary: '#36465d',
			secondary: '#4a8272',
			accent: '#9b03a5',
			error: '#d00',
			info: '#09a',
			success: '#266150',
			warning: '#fa0'
		}
		this.windowResized ()
	},
	methods: {
    navigationPanelHandler: function ( val ) {
        this.$store.commit( 'changeCurrentSectionId', val )
        this.$store.commit( 'getCurrentSectionInfo' )
        this.$store.commit( 'getCurrentSectionPosts' )
        this.$router.push ( { name: "mainSection", params: { id: val } } )
    },
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
		startNewQuiz: function () {
			this.startQuiz = true
			this.$http.get ( 'data/perspectivePictures.json' )
					.then ( response => {
						this.$store.commit ( 'buildPerspective', response.body )
						this.perspectiveReady = true
						this.level = 1
					})
			this.$http.get ( 'data/quiz_01.json' )
					.then ( response => {
						this.$store.commit ( 'buildQuiz', response.body )
						this.quizReady = true
						this.level = 1
					})
		},
		windowResized () {
        this.$emit ( 'win-resize' )
    }
	},
	components: {
		'login-component': LoginComponent,
		'user-info': UserInfo,
		'dropdown-menu': CustomSelect,
		//MainSection,
		'full-screen-chat': FullScreenChat,
		'nav-panel': NavigationPanel,
		'toggle-buttons': ToggleButtons,
		'app-footer': appFooter,
		'quiz-component': QuizComponent
	},
  //render: h => h(App)
}).$mount ( '#VueCourseware' )
