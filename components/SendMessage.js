const FullScreenChat = ( 'full-screen-chat', {
    props: [ "user", "dialog" ],
    data: function () {
        return {
            menu: false,
            modal: false,
            text: '',
            newMessage: {}
        }
    },
    computed: {
        messagesDate: function () {
            return this.$root.$store.state.messagesDate
        },
        messages: function () {
            return this.$root.$store.state.messages
        },
        messagesRef: function () {
            return this.$root.$store.state.messagesRef
        }
    },
    template: `
    <v-layout row justify-left>
      <v-dialog   v-model = "dialog"  fullscreen
                  class = "transparent"
                  transition = "dialog-bottom-transition"
                  :overlay = false  scrollable>
          <!--<v-btn  icon dark ripple
                  color = "transparent"
                  slot = "activator">
                <v-icon>message</v-icon>
          </v-btn>-->
          <v-card  class = "transparent">
            <v-toolbar style = "flex: 0 0 auto;"
                       class = "accent top-of-the-window"
                       dark>
              <v-btn  icon dark class = "transparent"
                      @click.native = "sendCloseEvent">
                <v-icon> close </v-icon>
              </v-btn>
              <v-toolbar-title class = "transparent">
                  {{ messagesDate }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <vue-data-picker></vue-data-picker>
            </v-toolbar>
            <div class = "middle-of-the-window">
                <v-card-text  class= "transparent"
                        v-for = "item in messages">
                    <v-avatar v-if = "item.user.photo">
                        <img :src = "item.user.photo">
                    </v-avatar>
                    <div class = "warning--text">{{ item.user.name }}</div>
                    <p style = "height:fit-content">{{ item.text }}</p>
                </v-card-text>
            </div>
            <v-card-actions class = "primary bottom-of-the-window">
                  <v-text-field
                      label = "Текст сообщения"
                      v-model = "text"
                      @change.native.stop = "sendMessage">
                  </v-text-field>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    `,
    methods: {
      sendCloseEvent: function () {
          this.$root.$emit ( 'closeCurrentDialog' )
      },
      sendMessage: function () {
          this.messagesRef.push ({
              user: this.user,
              text: this.text
          })
          this.text = ""
      },
    },
    components: {
        VueDataPicker
    },
    mounted: function () {
        
    }
})
