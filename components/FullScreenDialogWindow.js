const FullScreenDialogWindow = ({
    props: [ "__title", "__text" ],
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

      <v-dialog   v-model = "dialog"  fullscreen
                  dark class = "secondary"
                  transition = "dialog-bottom-transition">
          <v-card  class = "secondary">
            <v-toolbar style = "flex: 0 0 auto;"
                       class = "accent"
                       style = "position: fixed; top: 0; z-index: 100;"
                       dark>
              <v-btn  icon dark class = "transparent"
                      @click.native = "dialog = false">
                <v-icon> close </v-icon>
              </v-btn>
              <v-toolbar-title>{{ __title }}</v-toolbar-title>
              <v-spacer></v-spacer>

          </v-toolbar>
          <v-card-text class = "columns" style = "padding-top: 58px;" v-html = "__text"></v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
    `,
  mounted: function () {
    
  }
})
