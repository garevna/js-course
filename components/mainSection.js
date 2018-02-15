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
      this.$router.push ( { name: val, props: true } )
    } )
  },
  components: {
    //'dropdown-menu': BaseDropdownMenu,
    'toggle-buttons': ToggleButtons
  },
  template: `
    <div @scroll = "handleScroll" style = "overflow-y: scroll;">
      <router-view></router-view>
    </div>
  `
}
