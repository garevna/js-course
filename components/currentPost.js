'use strict'

import BottomSheet from './bottomSheet'
import FullScreenDialogWindow from './FullScreenDialogWindow'
import cardTemplate from './cardTemplate'

const currentPost = ( 'current-post', {
  data: function () {
    return {
        postObject: null,
        readmeContent: null,
        readmeType: 'none',
        text: null,
        state: this.$root.$store.state,
        scrollPosition: 0
    }
  },
  computed: {
      readmeItems: function () {
          return this.readmeType !== 'js' ? [] : this.$root.$store.state.currenPostReadmeItems
      },
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
    <section id = "CURRENT POST" v-if = "postObject">
      <v-toolbar class = "dark accent" prominent height = "36px">

        <full-screen-dialog-window
                  :__title = "postObject.head"
                  :__content = "readmeContent"
                  :__type = "readmeType"
                  v-if = "readmeType !== 'none'">
        </full-screen-dialog-window>

        <bottom-sheet class = "dark transparent"
                      v-if = "postObject.usefull"
                      :usefull_links = "postObject.usefull">
        </bottom-sheet>
      </v-toolbar>
      <card-template v-resize = "$root.windowResized" :text="text" :picture="postObject.picture">
      </card-template>
      <v-card>
        <!--<v-container fluid grid-list-lg class = "transparent">
          <v-layout row wrap>
            <v-flex xs12 sm8>
                <div v-html = "text"></div>
            </v-flex>
            <v-flex xs12 sm4>
                <v-card-media v-if = "postObject.picture"
                  :src = "postObject.picture"
                  height = "200"
                  contain
                ></v-card-media>
            </v-flex>-->

          <v-container fluid grid-list-lg class = "transparent">
            <v-flex xs12>
              <div class = "code-snippet" v-if = "codeExist">
                <div v-for = "(code_item, index) in postObject.code"
                      :key = "index">
                      {{ code_item.replace(/ /g,"&nbsp;") }}
                </div>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
          <v-card-actions class = "dark accent">
            <div class="text-xs-center">
                <v-btn  flat dark accent icon
                        v-for = "( sample, index ) in postObject.samples"
                        :key = "index"
                        @click = "openRef(sample)">
                  <v-badge right color = "warning">
                    <span slot = "badge">{{ (index+1) }}</span>
                    <v-icon>local_cafe</v-icon>
                  </v-badge>
                </v-btn>
            </div>
          </v-card-actions>
        </v-card>
    </section>
  `,
  methods: {
      openRef: ref => window.open ( ref, "_blank" ),
      getScriptItems: function ( fileName ) {
        var scriptElement = document.getElementById ( "dynamicJS" )
        if ( scriptElement ) {
          if ( scriptElement.src === fileName ) return
          scriptElement.parentNode.removeChild ( scriptElement )
        }
        scriptElement = document.createElement ( 'script' )
        document.getElementsByTagName('head')[0].appendChild ( scriptElement )
        scriptElement.id = "dynamicJS"
        var store = this.$store
        scriptElement.onload = function () {
            store.commit( 'setCurrentPostIdReadmeItems', items )
            store.commit( 'setCurrentPostIdReadmeCommonText', items )
        }
        scriptElement.src = fileName
      },
      getPostObject: function () {
        var getReady = new Promise ( ( resolve, reject ) => {
                if ( this.state.sectionPosts && this.postName ) {
                    var tmp = this.state.sectionPosts.filter ( post =>
                                                  post.head === this.postName )
                    resolve ( ( tmp.length === 0 ) ? this.state.emptyPost : tmp [0] )
                }
        })
        getReady.then ( res => {
            this.postObject = res
            if ( !this.postObject.readme ) {
                this.readmeContent = null
                this.readmeType = 'none'
            } else {
              this.readmeType = this.postObject.readme.indexOf ('.js') > 0 ? 'js' : 'html'
              if ( this.readmeType === 'js' )
                  this.getScriptItems ( this.postObject.readme )
              else
                  this.$root.$http.get ( this.postObject.readme ).then ( response => {
                      this.readmeContent = response.body
                  })
            }
            if ( this.postObject.textURL )
                  this.$root.$http.get ( this.postObject.textURL ).then ( response => {
                      this.text = response.body
                  })
            else this.text = this.postObject.text
        })
      },
  },
  mounted: function () {
      this.getPostObject ()
  },
  components: {
    'bottom-sheet': BottomSheet,
    'full-screen-dialog-window': FullScreenDialogWindow,
    'card-template': cardTemplate
  }
})
export default currentPost
