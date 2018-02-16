const ToggleButtons = ( 'toggle-buttons', {
  props: [ '__buttons' ],
  data: function () {
      return {
        store: this.$root.$store,
        route: this.$root.$route,
        val: undefined,
        toggle_exclusive: null
      }
  },
  watch: {
    val: function () {
        //var __name = this.val === 0 ? 'about' : 'details'
        //this.$root.$router.push ( { name: __name } )
    },
    routeName: function ( newVal, oldVal ) {
        this.toggle_exclusive = this.calcToggleNum ( newVal )
    }
  },
  computed: {
    routeName: function () { 
        this.toggle_exclusive = this.calcToggleNum ( this.$route.name )
        return this.$route.name
    },
    toggleButtonsVisibility: function () {
      return this.$root.$store.getters.sectionIsReady
    }
  },
  template: `
        <v-btn-toggle dark v-if = "toggleButtonsVisibility"
                      v-model="toggle_exclusive"
                      class="py-2">
              <v-btn  outline  replace = true
                      @click = "router.push ( { name: 'about' } )">
                  <v-icon>description</v-icon>
              </v-btn>
              <v-btn  outline  replace = true
                      @click = "router.push ( { name: 'details' } )">
                  <v-icon>dashboard</v-icon>
              </v-btn>
        </v-btn-toggle>
  `,
  mounted: function () {
      this.val = this.toggle_exclusive
  },
  methods: {
      calcToggleNum: function ( routeName ) {
          return routeName === 'about' ? 0 :
                  ( routeName === 'details' || routeName === 'section' ? 1 : null )
      }
  }
})
