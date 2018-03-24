'use strict'

import styles from '../css/sectionDetails.css'

import currentPost from './currentPost'
import CustomSelect from './CustomSelect'

const SectionDetails = {
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
  template: `
    <section class = "section-container">
        <select-post  :states = "sectionPostNames"
                      v-if = "sectionPostNames"
                      v-model = "currentPostId"
                      @change = "console.log ('currentPostId was changed')">
        </select-post>
        <router-view :postId = "currentPostId"></router-view>
    </section>
    `
}
export default SectionDetails
