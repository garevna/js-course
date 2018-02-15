const currentPost = ( 'current-post', {
  data: function () {
    return {
        readmeContent: null,
        state: this.$root.$store.state,
        scrollPosition: 0
    }
  },
  computed: {
      styleObject: {
        get: function () {
          return { top: this.scrollPosition + "px" }
        },
        set: function ( newValue ) {
          this.styleObject = { top: newValue + 'px' }
        }
      },
      postName: function () { return this.$root.$route.params.post },
      postObject: function () {
          if ( !this.state.sectionPosts || !this.postName ) return null
          var postsId = this.postName
          var posts = this.state.sectionPosts.filter ( post =>
                                        post.head === postsId )
          if ( posts.length === 0 ) return this.state.emptyPost
          else return posts [0]
      },
      codeExist: function () {
        return this.postObject.code.length > 0
      },
  },
  watch: {
    postObject: function ( newVal, oldVal ) {
      //console.log ( 'postObject old: ', oldVal )
      //console.log ( 'postObject new: ', newVal )
      if ( !this.postObject.readme ) this.readmeContent = null
      else
          this.$root.$http.get ( this.postObject.readme ).then ( response => {
              this.readmeContent = response.body
          })
      if ( this.postObject.textURL )
          this.$root.$http.get ( this.postObject.textURL ).then ( response => {
              this.postObject.text = response.body
          })
    },
    'postObject.text': function ( newVal, oldVal ) {
      //console.log ( 'postObject.text old: ', oldVal )
      //console.log ( 'postObject.text new: ', newVal )
    }
  },
  template: `

    <v-section v-if = "postObject">
      <v-toolbar class = "dark accent" prominent height = "48px">

        <full-screen-dialog-window
                  :__title = "postObject.head"
                  :__text = "readmeContent"
                  v-if = "readmeContent">
        </full-screen-dialog-window>

        <bottom-sheet class = "dark accent"
                      v-if = "postObject.usefull"
                      :usefull_links = "postObject.usefull">
        </bottom-sheet>
      </v-toolbar>
      <v-card color = "transparent" class = "white--text">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 sm8>
                <p v-html = "postObject.text"></p>
            </v-flex>
            <v-flex xs12 sm4>
              <transition name = "slide-down">
                <v-card-media v-if = "postObject.picture"
                  id = "scrollingPicture"
                  class = "scrollingPicture"
                  :src = "postObject.picture"
                  :style = "styleObject"
                  :key = "scrollPosition"
                  contain
                ></v-card-media>
              </transition>
            </v-flex>
            <v-flex xs12>
              <div class = "code-snippet" v-if = "codeExist">
                <div v-for = "code_item in postObject.code">
                      {{ code_item.replace(/ /g,"&nbsp;") }}
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
          <v-card-actions class = "dark accent">
            <div class="text-xs-center">
                <v-btn  flat dark accent
                        v-for = "( sample, index ) in postObject.samples"
                        @click = "openRef(sample)">
                    <span class = "samples-section-item">
                          {{ " { " + (index+1) + " }" }}
                    </span>
                </v-btn>
            </div>
          </v-card-actions>
        </v-card>
    </v-section>
  `,
  methods: {
    openRef: ref => window.open ( ref, "_blank" ),

  },
  mounted: function () {
      const __this = this
      
      var currentPostObject = async ( state, postId ) => {
          var postId = await postId
          var posts = await state.sectionPosts
          console.log ( postId )
          console.log ( posts )
          var selected = state.sectionPosts.filter ( post => post.head === postsId )
          var res = ( selected.length === 0 ) ? state.emptyPost : selected [0]
          console.log ( res )
          if ( res.readme ) {
              __this.readmeContent = await __this.$root.$http.get ( res.readme )
              console.log ( 'readmeContent: ', __this.readmeContent )
              __this.text = await __this.$root.$http.get ( res.textURL )
              console.log ( 'post text: ', __this.text )
      }
      
      this.$root.$on ( 'scroll-event', function ( currentScrollPosition ) {
          __this.scrollPosition = window.innerWidth > 600 ? currentScrollPosition*0.95 : 0
      } )
  },
  components: {
    'bottom-sheet': BottomSheet,
    'full-screen-dialog-window': FullScreenDialogWindow
  }
})
