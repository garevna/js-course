'use strict'

const ToggleButtons = ( 'toggle-buttons', {
  props: [ '__buttons' ],
  data: function () {
      return {
        vals: [ 'about', 'details' ],
        toggle_none: null
      }
  },
  watch: {
    toggle_none: function ( newVal, oldVal ) {
      if ( this.$route.path.indexOf ( 'section' ) > 0 ) return
      if ( newVal !== null )
        this.$root.$router.push ( { name: this.vals [ newVal ] } )
    }
  },
  computed: {
    toggleButtonsVisibility: function () {
      return this.$root.$store.getters.sectionIsReady
    }
  },
  template: `
        <v-btn-toggle dark v-if = "toggleButtonsVisibility"
                      v-model="toggle_none"
                      class="py-2">
              <v-btn  outline
                      @click = "$root.$router.push ( { name: 'about' } )">
                  <v-icon>description</v-icon>
              </v-btn>
              <v-btn  outline
                      @click = "$root.$router.push ( { name: 'details' } )">
                  <v-icon>dashboard</v-icon>
              </v-btn>
        </v-btn-toggle>
  `,
  mounted: function () {
    this.toggle_none = this.$route.path.indexOf ( this.vals [0] ) > 0 ? 0 :
                        ( this.$route.path.indexOf ( this.vals [1] ) > 0 ? 1 : null )
  }
})

export default ToggleButtons
