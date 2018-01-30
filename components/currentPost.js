const currentPost = ( 'current-post', {
  props: [ "postId" ],
  data: function () {
    console.log ( 'currentPost route.params.post: ' + this.$root.$route.params.post )
    return {
      readmeContent: null,
      state: this.$root.$store.state,
    }
  },
  computed: {
      postName: function () { return this.$root.$route.params.post },
      postObject: function () {
          console.log ( 'currentPost $attrs: ', this.$attrs )
          if ( !this.state.sectionPosts || !this.postName ) return null
          var postsId = this.postName
          console.log ( 'currentPost postName: ' + this.postName )
          var posts = this.state.sectionPosts.filter ( post =>
                                        post.head === postsId )
          console.log ( 'currentPost postObject: ', posts.length === 0 ? emptyPost : posts [0] )
          if ( posts.length === 0 ) return this.state.emptyPost
          else return posts [0]
      },
      codeExist: function () {
        return this.postObject.code.length > 0
      },
  },
  watch: {
    readmeContent: function () {
      console.info ( 'readmeContent length: ' + this.readmeContent.length )
    }
  },
  template: `
  <v-app>
    <v-section v-if = "postObject">
      <v-toolbar class = "dark accent" prominent height = "48px">

        <full-screen-dialog-window
                  :__title = "postObject.head"
                  :__text = "readmeContent">
        </full-screen-dialog-window>

        <bottom-sheet class = "dark accent"
                      v-if = "postObject.usefull"
                      :usefull_links = "postObject.usefull">
        </bottom-sheet>
      </v-toolbar>
      <v-card class = "expand-elem primary">
          <v-card-media v-if = "postObject.picture"
              class = "section-picture"
              :src = "postObject.picture"
              height="200px">
          </v-card-media>
          <v-card-title class="dark secondary">
            <p v-html = "postObject.text"></p>
          </v-card-title>
          <v-card-text class="dark secondary">
            <div class = "code-snippet" v-if = "codeExist">
              <div v-for = "code_item in postObject.code">
                {{ code_item.replace(/ /g,"&nbsp;") }}
                </div>
            </div>
          </v-card-text>
          <v-card-actions class = "dark accent">
            <v-btn flat dark accent
                v-for = "( sample, index ) in postObject.samples"
                @click = "openRef(sample)">
                <span class = "samples-section-item">{{ "{ " + (index+1) + " }" }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-section>
  </v-app>`,
  methods: {
    openRef: ref => window.open ( ref, "_blank" )
  },
  mounted: function () {
    console.log ( 'currentPost  this.postName: ', this.postName )
    console.log ( 'currentPost this.state.sectionPosts: ' + this.state.sectionPosts )
    console.log ( 'currentPost  postObject: ', this.postObject )
    if ( !this.postObject.readme ) return
    this.$root.$http.get ( this.postObject.readme ).then ( response => {
            this.readmeContent = response.body
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
