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
      user: null
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
    setUser: ( state, user ) => {
        state.user = user
    },
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
    
  },
  mounted: function () {
    
  }
})
