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
      console.log ( oldVal )
      console.log ( newVal )
      this.getPostObject ()
      this.readTheData ()
      //const __this = this
      //var currentPostData = async ( postObject ) => {
      //    if ( postObject.readme ) {
      //        let answer = await __this.$root.$http.get ( postObject.readme )
      //        __this.readmeContent = answer.body
      //    } else __this.readmeContent = ""
      //    if ( postObject.textURL ) {
      //        let answer = await __this.$root.$http.get ( postObject.textURL )
      //        __this.text = answer.body
      //    } else __this.text = postObject.text
      //}
      //currentPostData ( newVal )
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
                <div>{{text}}</div>
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
        var __this = this
        var getReady = function () {
            return new Promise ( function ( resolve, reject ) {
                if ( __this.state.sectionPosts && __this.postName ) {
                    var tmp = __this.state.sectionPosts.filter ( post =>
                                                  post.head === __this.postName )
                    return ( tmp.length === 0 ) ? this.state.emptyPost : tmp [0]
                }
            })
        }
        getReady ().then ( res => {
            console.log ( '!!!!!!!!!!!!!!', res )
            __this.postObject = res.body
            console.log ( __this.postObject )
            __this.readTheData ()
        } )  
      },
      readTheData: () => {
          if ( !this.postObject ) {
            setTimeout ( function () {
              console.log ( 'postObject after timeout ', this.postObject )
            }, 200 )
          }
          if ( !this.postObject.readme ) this.readmeContent = null
          else
              this.$root.$http.get ( this.postObject.readme ).then ( response => {
                  this.readmeContent = response.body
              })
          if ( this.postObject.textURL )
              this.$root.$http.get ( this.postObject.textURL ).then ( response => {
                  this.text = response.body
              })
          else this.text = this.postObject.text
      }
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
