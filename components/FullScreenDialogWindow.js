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
              color = "accent"
              @click.native.stop = "dialog = true">
            <v-icon> description </v-icon>
      </v-btn>

      <v-dialog   v-model = "dialog"  fullscreen
                  transition="dialog-bottom-transition"
                  :overlay = false  scrollable>
          <v-card>
            <v-toolbar style = "flex: 0 0 auto;"
                       class = "dark primary"
                       dark>
              <v-btn  icon class = "dark secondary"
                      @click.native="dialog = false">
                <v-icon> close </v-icon>
              </v-btn>
              <v-toolbar-title>{{ __title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                  <v-btn dark flat @click.native = "dialog = false">
                        <v-icon> save </v-icon>
                 </v-btn>
                 <v-menu bottom right offset-y>
                    <v-btn slot="activator" dark icon>
                        <v-icon> more_vert </v-icon>
                    </v-btn>
                 </v-menu>
              </v-toolbar-items>
          </v-toolbar>
          <v-card-text v-html = "__text"></v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
    `,
  mounted: function () {
    console.info ( this.__title )
    console.info ( this.__text )
  }
})
