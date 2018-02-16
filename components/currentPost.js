const currentPost = ( 'current-post', {
  data: function () {
    return {
        postObject: null,
        readmeContent: null,
        text: null,
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
      codeExist: function () {
        return this.postObject.code.length > 0
      },
  },
  watch: {
      postName: function ( newVal, oldVal ) {
        this.getPostObject ()
      },
      'state.sectionPosts': function ( newVal, oldVal ) {
        this.getPostObject ()
      }
  },
  template: `

    <v-section id = "CURRENT POST" v-if = "postObject">
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
                <div v-html = "text"></div>
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
      getPostObject: function () {
        const __this = this
        let getReady = function () {
            return new Promise ( function ( resolve, reject ) {
                if ( __this.state.sectionPosts && __this.postName ) {
                    var tmp = __this.state.sectionPosts.filter ( post =>
                                                  post.head === __this.postName )
                    resolve ( ( tmp.length === 0 ) ? __this.state.emptyPost : tmp [0] )
                }
            })
        }
        getReady ().then ( res => {
            __this.postObject = res
            if ( !__this.postObject.readme ) __this.readmeContent = null
            else
              __this.$root.$http.get ( __this.postObject.readme ).then ( response => {
                  __this.readmeContent = response.body
              })
          if ( __this.postObject.textURL )
              __this.$root.$http.get ( __this.postObject.textURL ).then ( response => {
                  __this.text = response.body
              })
          else __this.text = __this.postObject.text
        } )  
      },
  },
  mounted: function () {
      this.getPostObject ()
      const __this = this
      this.$root.$on ( 'scroll-event', function ( currentScrollPosition ) {
          __this.scrollPosition = window.innerWidth > 600 ? currentScrollPosition*0.95 : 0
      } )
  },
  components: {
    'bottom-sheet': BottomSheet,
    'full-screen-dialog-window': FullScreenDialogWindow
  }
})
