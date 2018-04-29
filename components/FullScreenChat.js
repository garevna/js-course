'use strict'

import VueDataPicker from './VueDataPicker'

const FullScreenChat = {
    props: [ "dialog" ],
    data: function () {
        return {
            menu: false,
            modal: false,
            text: '',
            newMessage: {},
            container: null,
            elem: null,
            containerHeight: window.innerHeight * 0.7 + "px"
        }
    },
    computed: {
        user: function () { return this.$root.$store.state.user },
        userId: function () {
          return this.$root.$store.getters.currentUserId
        },
        messagesDate: function () {
            return this.$root.$store.state.messagesDate
        },
        messages: function () {
            return this.$root.$store.state.messages
        },
        messagesRef: function () {
            return this.$root.$store.state.messagesRef
        },

    },
    watch: {
        dialog: function ( newVal, oldVal ) {
            console.log ( newVal, oldVal )
            if ( !newVal ) return
            this.$nextTick ( function () {
                console.info ( 'this.$el.nodeType: ' + this.$el.nodeType )
                this.elem = document.getElementById ( "scrolled-content" )
                console.log ( 'this.elem: ', this.elem )
                this.container = document.getElementById ( "scroll-target" )
                this.container.scrollTop = Math.floor ( this.elem.offsetHeight )
                console.info ( 'container.scrollTop: ' + this.container.scrollTop )
            })
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
            <v-container  class = "middle-of-the-window scroll-y"
                          id = "scroll-target"
                          :style = "{ height: containerHeight, border: 'solid 3px red' }">
              <div id = "scrolled-content" column align-center justify-center>
                <v-card-text
                        class= "transparent"
                        v-for = "item in messages"
                        :key = "item.user.name">
                    <v-avatar v-if = "item.user.photoURL">
                        <img :src = "item.user.photoURL">
                    </v-avatar>
                    <div class = "warning--text">{{ item.user.name }}</div>
                    <div class = "info--text"><small>{{ item.data }} : {{ item.time }}</small></div>
                    <p style = "height:fit-content">{{ item.text }}</p>
                </v-card-text>
              </div>
            </v-container>
            <v-card-actions class = "transparent bottom-of-the-window"
                            >
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
          var x = new Date ().toLocaleString().split(", ")
          if ( !this.user ) this.$root.$store.commit ( 'setCurrentUser', {
              name: "Ирина Филиппова",
              email: "irina.h.fylyppova@gmail.com",
              providerData: [ { providerId: "google.com" }],
              photoURL: "https://lh3.googleusercontent.com/-Aml2QMGE_d0/AAAAAAAAAAI/AAAAAAAAAAA/AIcfdXDrUEdvT9JmQbWM7_VZ80SCCRuzig/s32-c-mo/photo.jpg",
              phoneNumber: "",
              lastSignInTime: new Date().toLocaleString()
          } )
          this.messagesRef.push ({
               user: this.userId || "-L5PX_3teCUcLnxOnV9Z",
               data: x[0],
               time: x[1],
               text: this.text
          })
          this.text = ""
      },
    },
    components: {
        'vue-data-picker': VueDataPicker
    },
    mounted: function () {
        this.$root.$on ( 'win-resize', () => {
            if ( this.elem ) {
                this.containerHeight = window.innerHeight * 0.7 + "px"
                this.offsetTop = Math.floor ( this.elem.offsetHeight )
            }
        })
    }
}
export default FullScreenChat
