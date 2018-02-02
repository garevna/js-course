const NavigationPanel = ( 'nav-panel', {
    props: [ "states" ],
    data: function () {
      return {
          drawer: null
      }
    },
    template: `
      <v-layout wrap justify-left>
        <v-btn  icon  large dark
                @click.stop = "drawer = !drawer">
            <v-icon>menu</v-icon>
        </v-btn>
        <v-navigation-drawer  temporary
                              v-model = "drawer"
                              light
                              clipped = true
                              height = "80%"
                              fixed>
          <v-list class="pa-1">
            <v-list-tile>
                <v-list-tile-avatar>
                    <img src="./images/vue.svg" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                          content
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
          </v-list>

          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile v-for = "item in states"
                         :key = "item"
                         class = "white"
                         @click = "clickHandler ( event, item )">
                  <v-list-tile-action>
                        <v-icon>assignment</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item }}
                        </v-list-tile-title>
                  </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    `,
    methods: {
        clickHandler: function ( event, val ) {
          this.$root.$store.commit( 'changeCurrentSectionId', val )
          this.$root.$store.commit( 'getCurrentSectionInfo' )
          this.$root.$store.commit( 'getCurrentSectionPosts' )
          this.$root.$router.push ( { name: "mainSection", params: { id: val } } )
        }
    },
    mounted: function () {
      
    }
})
