const BottomSheet = ( {
  props: [ "usefull_links" ],
  data: function () {
    return {
      sheet: false
    }
  },
  template: `
    <div class="text-xs-right pa-0 ma-0" height = "35px">
      <v-bottom-sheet v-model = "sheet"
                      dark
                      class = "transparent text-xs-right pa-0 ma-0">
          <v-btn  icon ripple dark
                  class = "accent"
                  slot = "activator">
            <v-icon>link</v-icon>
          </v-btn>
        <v-list>
          <v-subheader class = "dark accent">Полезные ссылки</v-subheader>
          <v-list-tile  v-for = "item in usefull_links"
                        :key = "item.ref"
                        @click = "resolveLink ( item.ref )">
            <span :class = "item.ico" elevation = "1"></span>
              &nbsp;
            </v-list-tile-avatar>
            <v-list-tile-title>{{ item.comment }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <p>&nbsp;</p>
      </v-bottom-sheet>
    </div>`,
  data: function () {
    return {
      sheet: false
    }
  },
  methods: {
    resolveLink: function ( ref ) {
      console.info ( ref )
      this.sheet = false
      window.open ( ref )
    }
  }
})
