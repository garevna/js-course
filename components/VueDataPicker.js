'use strict'

const VueDataPicker = {
    data: function () {
        return {
            pickerDate: this.$root.$store.state.messagesDate || null,
            menu: false
        }
    },
    template:`
          <v-flex xs6 sm4>
            <v-menu lazy
                    :close-on-content-click = "false"
                    v-model = "menu"
                    transition = "scale-transition"
                    offset-y
                    full-width
                    :nudge-right = "40"
                    max-width = "290px"
                    min-width = "290px">
            <v-text-field slot = "activator"
                          label = ""
                          v-model = "pickerDate"
                          prepend-icon = "event"
                          readonly>
            </v-text-field>
            <v-date-picker v-model = "pickerDate"
                           no-title scrollable actions>
              <template slot-scope = "{ save, cancel }">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color = "white" @click = "cancel">Cancel</v-btn>
                  <v-btn flat color = "white" @click = "sendEvent">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
    `,
    methods: {
        sendEvent: function () {
            this.$root.$store.commit ( 'changeMessagesData', this.pickerDate )
            this.menu = false
        }
    },
    mounted: function () {
        this.$root.$store.commit ( 'changeMessagesData', new Date() )
    }
}

export default VueDataPicker
