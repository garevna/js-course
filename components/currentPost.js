const currentPost = ( 'current-post', {
  props: [ "postId" ],
  data: function () {
    return {
      readmeContent: null,
      state: this.$root.$store.state,
    }
  },
  computed: {
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
    readmeContent: function () {
      
    }
  },
  template: `
    <v-section dark v-if = "postObject">
      <v-toolbar prominent height = "48px">

        <full-screen-dialog-window v-if = "readmeContent"
                  :__title = "postObject.head"
                  :__text = "readmeContent">
        </full-screen-dialog-window>

        <bottom-sheet v-if = "postObject.usefull"
                      :usefull_links = "postObject.usefull">
        </bottom-sheet>
      </v-toolbar>
      <v-card>
          <v-card-media v-if = "postObject.picture"
              class = "section-picture"
              :src = "postObject.picture"
              max-height="100px">
          </v-card-media>
          <v-card-title>
            <p v-html = "postObject.text"></p>
          </v-card-title>
          <v-card-text>
            <div class = "code-snippet" v-if = "codeExist">
              <div v-for = "code_item in postObject.code">
                {{ code_item.replace(/ /g,"&nbsp;") }}
                </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat dark accent
                v-for = "( sample, index ) in postObject.samples"
                @click = "openRef(sample)">
                <span class = "samples-section-item">{{ "{ " + (index+1) + " }" }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-section>
  `,
  methods: {
    openRef: ref => window.open ( ref, "_blank" )
  },
  mounted: function () {
    if ( !this.postObject.readme ) return
    this.$root.$http.get ( this.postObject.readme ).then ( response => {
            this.readmeContent = response.body
        console.log ( 'README: ', this.readmeContent )
    })
    if ( !this.postObject.textURL ) return
    this.$root.$http.get ( this.postObject.textURL ).then ( response => {
            this.postObject.text = response.body
    })
  },
  components: {
    'bottom-sheet': BottomSheet,
    'full-screen-dialog-window': FullScreenDialogWindow
  }
})
