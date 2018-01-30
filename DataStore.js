const store = new Vuex.Store ({
  state: {
      mainData: null,
      postData: null,
      mainDataIsReady: false,
      postDataIsReady: false,

      currentSectionId: null,
      sectionInfo: null,
      sectionPosts: null,

      currentPostId: null,
      currentPostContent: null,
      currentPostReadme: [],

      emptyPost: [{
          head: "В работе...",
          pict: "./images/smile-03.gif",
          text: `К сожалению, материал еще не готов`
      }],

  },
  getters: {
    dataIsReady:  state => state.mainDataIsReady && state.postDataIsReady,
    mainMenuReady: state => state.mainDataIsReady,
    sectionIdDefined:  state => ( state.currentSectionId !== null ),
    sectionIsReady:  state =>
          state.mainDataIsReady && state.postDataIsReady &&
                            state.currentSectionId !== null,
    mainMenuItems: state =>
          state.mainDataIsReady ?
          state.mainData.map ( item => item.name ) : [],
    sectionMenu: state => state.currentSectionId ? [
              { ico: 'description', clickHandler: "gotoAbout" },
              { ico: 'dashboard', clickHandler: "gotoDetails" }
            ] : null
  },
  mutations: {
    changeCurrentSectionId: ( state, sectionId ) => {
        if ( sectionId === 'about' || sectionId === 'details' )
              state.sectionMenuSelected = sectionId
        else {
          state.currentSectionId = sectionId
        }
    },
    getCurrentSectionInfo: state => {
      if ( !state.mainData ) return
      state.sectionInfo = state.mainData.filter ( item =>
                          item.name === state.currentSectionId )[0]
    },
    getCurrentSectionPosts: state => {
      if ( !state.postData || !state.currentSectionId ) return null
      state.sectionPosts = state.postData [ state.currentSectionId ]
    },
    setCurrentPostId: ( state, postId ) => {
      state.currentPostId = postId
    },
    getMainData: ( state, mainData ) => {
        state.mainData = mainData
        state.mainDataIsReady = true
        state.mainMenuOptions = mainData.map ( item => item.name )
    },
    getPostData: ( state, postData ) => {
        state.postData = postData
        state.postDataIsReady = true
    }
  },
  actions: {
    userSignUp ( { commit }, payload ) {
        commit ( 'setLoading', true )
        firebase.auth().createUserWithEmailAndPassword ( payload.email, payload.password )
            .then ( firebaseUser => {
                firebaseUser.sendEmailVerification ()
                    .then ( () => { console.log('welcome email has been sent') } )
                commit ( 'setUser', firebaseUser )
                commit ( 'setLoading', false )
                commit ( 'setError', null )
                router.push ( '/home' )
            })
            .catch(error => {
                commit ( 'setError', error.message )
                commit ( 'setLoading', false )
            })
    },
    userSignIn ( { commit }, payload ) {
      commit('setLoading', true)
          firebase.auth().signInWithEmailAndPassword ( payload.email, payload.password )
              .then ( firebaseUser => {
                  commit( 'setUser', firebaseUser )
                  commit( 'setLoading', false )
                  commit( 'setError', null )
                  router.push ( '/home' )
              })
              .catch ( error => {
                  commit ( 'setError', error.message )
                  commit ( 'setLoading', false )
      })
    }
  },
  mounted: function () {
    console.log ( this.currentSectionId )
  }
})
