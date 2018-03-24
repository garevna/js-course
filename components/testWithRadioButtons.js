export default radioButtonsTest = ( 'radio-buttons-test', {
    props: [ 'items', 'color' ],
    data: function () {
        return {
          selected: null
        }
    },
    template: `
        <v-container fluid class = "warning">
          <v-layout row wrap>
            <v-flex xs12 sm6 md6>
              <v-radio-group v-model = "selected" column>
                <v-radio  v-for = "item in items"
                          :key = "item"
                          :label = "item"
                          :color = "color"
                          :value = "item"
                ></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-btn icon class = success @click = "sendAnswer" >
              <v-icon>done</v-icon>
          </v-btn>
        </v-container>
    `,
    methods: {
        sendAnswer: function ( event ) {
            this.$root.$emit ( 'answerIsReady', this.selected )
        }
    }
})
