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
        <v-layout row wrap class="dark warning">
          <v-flex xs10 class="ml-3">
              <v-select class="mt-0 pt-0 pb-3"
                  :items = "states"
                  v-model = "selectedItem"
                  single-line
                  auto
                  hide-details
                  append-icon = "chrome_reader_mode"
                  class = "accent--text">
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
