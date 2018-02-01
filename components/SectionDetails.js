const SectionDetails = {
  props:[ 'id' ],
  data: function () {
      return {
        currentPostId: ""
      }
  },
  computed: {
    sectionIsReady: function () {
      return this.$root.$store.getters.sectionIsReady
    } ,
    sectionPosts: function () {
      this.$root.$store.commit ( 'getCurrentSectionPosts' )
      return this.$root.$store.state.sectionPosts
    },
    sectionPostNames: function () {
      if ( !this.sectionPosts ) return null
      return this.sectionPosts.map ( x => x.head )
    }
  },
  components: {
    'current-post': currentPost,
    'select-post': CustomSelect
  },
  methods: {

  },
  mounted: function () {
      console.log ( 'SectionDetails this.$root.$route.path:', this.$root.$route.path )
  },
  template: `
    <section>
        <select-post  :states = "sectionPostNames"
                      v-if = "sectionPostNames"
                      v-model = "currentPostId"
                      @change = "console.log ('currentPostId')">
        </select-post>
        <router-view class = "router-view" :postId = "currentPostId">
        </router-view>
    </section>

    <!--
      <v-expansion-panel focusable v-if = "sectionIsReady">
        <v-expansion-panel-content
                :key = "index">
            <div class="title" slot = "header">
              {{ item.head }}
            </div>
            <v-card>
              <v-card-text>
                  <current-post
                      :index = "index"
                      :postObject = "item">
                  </current-post>
              </v-card-text>
            </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-app>-->
    `
}
