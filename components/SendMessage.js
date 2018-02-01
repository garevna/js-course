const SendMessage = ( 'send-message', {
    props: [ 'loginName' ],
    data: function () {
        return {
            topic: [],
            type: 'message',
            user: null,
            text: '',
            typeItems: [
              "Вопрос",
              "Комментарий",
              "Ссылка"
            ],
            newMessage: {},
            dialog: false
        }
    },
    computed: {
        topicItems: function () {
          return this.$root.$store.getters.mainMenuItems
        },
        messagesRef: function () {
          return this.$root.messagesRef
        }
    },
    template: `
    <v-layout row justify-center>
      <v-dialog v-model = "dialog"
                persistent
                max-width = "500px">
        <v-btn  icon color = "primary" dark
                slot = "activator">
            <v-icon>message</v-icon>
        </v-btn>
        <v-card>
          <v-card-title v-text = "loginName">
          </v-card-title>
          <v-card-text>
              <v-container grid-list-md>
                  <v-layout wrap>
                      <!--<v-flex xs12 sm6 md4>
                          <v-card-text v-text = "loginName">
                          </v-card-text>
                      </v-flex>-->
                      <v-flex xs12 sm6 md4>
                          <v-select
                              v-bind:items = "topicItems"
                              label = "Тема сообщения"
                              v-model = "topic"
                              multiple
                              autocomplete
                              chips>
                          </v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md4>
                          <v-select
                              v-bind:items = "typeItems"
                              label = "Тип сообщения"
                              v-model = "type">
                          </v-select>
                      </v-flex>
                      <v-flex xs12>
                          <v-text-field
                                label = "Текст сообщения"
                                v-model = "text"
                                multi-line
                                required>
                          </v-text-field>
                      </v-flex>
                  </v-layout>
              </v-container>
              <small>*обязательные поля</small>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
                  <v-btn flat @click.native = "dialog = false">
                      Close
                  </v-btn>
                  <v-btn flat @click.native = "sendMessage">
                      Send
                  </v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-layout>
    `,
    methods: {
      sendMessage: function () {
         messagesRef.push ( this.newMessage )
         this.newMessage.time = new Date ()
         this.newMessage.user = this.user
         this.newMessage.topic = this.topic
         this.newMessage.type = this.type
         this.newMessage.text = this.text
      }
    },
    mounted: function () {
      console.log ( 'loginName: ', this.loginName )
    }
})
