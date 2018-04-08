'use strict'

import ToggleButtons from './toggleButtons'

const MainSection = {
  props: [ "id" ],
  data: function () {
    return  {
      sectionMenu: [
        {
          color: "deep-orange darken-4",
          ico: 'description',
          clickHandler: "selectedSection"
        }
      ],
      sectionInfoIsVisible: false,
      sectionPostsAreVisible: false,
      scrollPosition: 0
    }
  },
  computed: {
      sectionIsReady: function () {
        return this.$root.$store.getters.sectionIsReady
      },
      sectionInfoVisible: function () {
        return this.$root.$store.getters.sectionInfoVisible
      },
      sectionPostsVisible: function () {
        return this.$root.$store.getters.sectionPostsVisible
      },
      sectionInfo: function () {
        return this.$root.$store.sectionInfo
      },
      sectionPosts: function () {
        return this.$root.$store.sectionPosts
      }
  },
  methods: {
    selectedSection: val => {
      this.$router.push ( { name: val, props: true } )
    },
    handleScroll: function ( event ) {
        var currentScrollPosition = event.srcElement.scrollTop
        this.scrollPosition = currentScrollPosition
        this.$root.$emit ( 'scroll-event', currentScrollPosition )
    }
  },
  mounted: function () {
    this.$root.$store.commit ( 'changeCurrentSectionId', this.id )
    this.$on ( 'menuSelect', function ( val ) {
      this.$root.$router.push ( { name: val, props: true } )
    } )
  },
  components: {
    'toggle-buttons': ToggleButtons
  },
  template: `
    <v-container id = "mainSection" class = "transparent pa-0 mx-auto">
      <router-view></router-view>
    </v-container>
  `
}
export default MainSection
