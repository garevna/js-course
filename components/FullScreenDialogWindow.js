'use strict'

const FullScreenDialogWindow = {
    props: [ "__title", "__content", "__type" ],
    data: function () {
      return {
        dialog: false
      }
    },
    template: `
    <v-layout row justify-left>
      <v-btn  icon ripple
              class = "transparent"
              @click.native.stop = "dialog = true">
            <v-icon> description </v-icon>
      </v-btn>

      <v-dialog   v-model = "dialog"  fullscreen dark
                  transition = "dialog-bottom-transition">
          <v-card class = "columns">
            <v-toolbar dark class = "accent"
                       style = "flex: 0 0 auto;
                                position: fixed;
                                top: 0;
                                z-index: 100;">
              <v-btn  icon dark class = "transparent"
                      @click.native = "dialog = false">
                <v-icon> close </v-icon>
              </v-btn>
              <v-toolbar-title>{{ __title }}</v-toolbar-title>
              <v-spacer></v-spacer>

          </v-toolbar>
          <v-layout class = "columns" v-if = "__type === 'html'">
            <v-flex xs12 sm10 md8 lg6 mx-auto class = "dark-glass">
              <v-card-text class = "transparent"
                       style = "padding-top: 80px;"
                       v-html = "__content">
              </v-card-text>
            </v-flex>
          </v-layout>
          <expansion-elems v-if = "__type === 'js'">
          </template-for-js>
        </v-card>
      </v-dialog>
    </v-layout>
    `,
    components: {
      'expansion-elems': {
        computed: {
            contentItems: function () {
              return this.$root.$store.state.currentPostReadmeItems
            }
        },
        template: `
          <v-container dark transparent mt-5>
            <v-expansion-panel>
              <v-expansion-panel-content
                    v-for = "( item, index ) in contentItems"
                    :key = "index">
                <div slot = "header">
                  {{ item.header }}
                </div>
                <v-card dark class = "transparent">
                  <v-card-text>
                    <div v-html = "item.content"></div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-container>`,
      }
    }
}
export default FullScreenDialogWindow
