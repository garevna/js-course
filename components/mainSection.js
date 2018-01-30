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
      sectionPostsAreVisible: false
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
    }
  },
  mounted: function () {
    console.log ( 'MainSection: ', this.id )
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
    <div class = "inner-content">
      <div class = "main-content-header" v-if = "id">
        <span>&nbsp;{{ id }}</span>
      </div>

      <router-view class="section-info"></router-view>
    </div>
  `
}
