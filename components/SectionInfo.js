'use strict'

import styles from '../css/sectionInfo.css'

import BottomSheet from './bottomSheet'

const SectionInfo = {
  props:[ 'id' ],
  computed: {
    sectionIsReady: function () {
      return this.$root.$store.getters.sectionIsReady
    },
    sectionInfo: function () {
      this.$root.$store.commit ( 'getCurrentSectionInfo' )
      return this.$root.$store.state.sectionInfo
    }
  },
  methods: {
    openRef: ref => window.open ( ref, "_blank" )
  },
  components: {
    'bottom-sheet': BottomSheet
  },
  template: `
      <v-container v-if = "sectionIsReady">
        <bottom-sheet v-if = "sectionInfo.usefull"
              :usefull_links = "sectionInfo.usefull">
        </bottom-sheet>
          <img v-if = "sectionInfo.picture"
               class = "section-picture"
               :src = "sectionInfo.picture"/>
          <a v-if = "sectionInfo.ref"
                target = "_blank"
                class = "demo-button"
                :href = "sectionInfo.ref">
          </a>
          <div class = "section-title">
              {{ sectionInfo.title }}
          </div>
          <p  v-html = "sectionInfo.comment"
              class = "white--text">
          </p>
          <div v-if = "sectionInfo.code"
                class = "code-snippet">
            <p v-for = "item in sectionInfo.code">
                {{ item.replace(/ /g,"&nbsp;") }}
            </p>
          </div>
    </v-container>
  `,
  mounted: function () {

  }
}
export default SectionInfo
