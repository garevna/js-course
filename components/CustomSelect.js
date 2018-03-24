'use strict'

const CustomSelect = ( 'custom-select', {
  props: [ "states" ],
  data: function () {
    return {
      store: this.$root.$store,
      selectedItem: null,
      search: null
    }
  },
  computed: {
    value: function () {
      return this.selectedItem
    }
  },
  template: `
        <v-layout row wrap dark class = "transparent">
          <v-flex xs10 class = "ml-3">
              <v-select class = "mt-0 pt-0 pb-3 warning--text"
                  :items = "states"
                  v-model = "selectedItem"
                  single-line
                  auto
                  content-class = "select-post-topic"
                  hide-details
                  append-icon = "chrome_reader_mode">
                  autocomplete = true>
              </v-select>
          </v-flex>
        </v-layout>`,
  methods: {
  },
  watch: {
      'selectedItem': function ( val ) {
          if ( !val ) return
          this.$root.$store.commit ( 'setCurrentPostId', val )
          this.$root.$router.push ( { name: 'section', params: { post: val } } )
      }
  },
  mounted: function () {
    this.selectedItem = this.$root.$route.params.post
  }
})

export default CustomSelect
