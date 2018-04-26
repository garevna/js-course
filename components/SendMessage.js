const FullScreenChat = ( 'full-screen-chat', {
    props: [ "dialog" ],
    data: function () {
        return {
            menu: false,
            modal: false,
            text: '',
            newMessage: {}
        }
    },
    computed: {
        user: function () { return this.$root.$store.state.user },
        userId: function () { return this.$root.$store.getters.currentUserId ( this.user ) },
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
          <v-card  class = "columns">
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
                        v-for = "item in messages"
                        :key = "item.user.name">
                    <v-avatar v-if = "item.user.photoURL">
                        <img :src = "item.user.photoURL">
                    </v-avatar>
                    <div class = "warning--text">{{ item.user.name }}</div>
                    <p style = "height:fit-content">{{ item.text }}</p>
                </v-card-text>
            </div>
            <v-card-actions class = "transparent bottom-of-the-window">
                  <v-text-field class = "primary warning--text"
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
               user: this.userId,
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
