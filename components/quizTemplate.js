'use strict'

const quizTemplate = {
    props: [ "params" ],
    data: function () {
      return {
        activeTab: null,
        snackbar: false
      }
    },
    watch: {
      params: function ( newVal, oldVal ) {
        this.activeTab = "0"
      }
    },
    methods: {
      answerIsReady: function () {
        this.$parent.validateAnswer ()
        this.snackbar = true
      },
      nextLevel: function () {
        this.snackbar = false
        this.$parent.nextLevel ()
      }
    },
    template: `
      <v-container grid-list-sm mx-auto pb-5
                 class = "transparent"
                 style = "position:fixed;
                          top:0;left:0;
                          bottom:30px;right:0">
        <v-flex d-flex xs12 mx-auto>
          <v-card dark color = "warning white--text">
            <slot name = "question"></slot>
          </v-card>
        </v-flex>
        <v-card dark color = "success warning--text"
                height = "75%" style = "overflow:auto">
          <v-tabs v-model = "activeTab"
                  color = "accent" dark
                  slider-color="warning">

            <v-tab  v-for="( item, index ) in params"
                    :key="index"
                    ripple>
              <span v-if = 'item.tabSymbol'>
                {{ item.tabSymbol }}
              </span>
              <v-icon v-if = 'item.tabIcon'>
                {{ item.tabIcon }}
              </v-icon>
            </v-tab>

            <v-tab-item v-for="( item, index ) in params"
                        :key="index">
              <v-card flat color = "success">
                  <slot :name = "item.slotName"></slot>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>

        <v-layout row wrap justify-center>
          <v-flex d-flex xs12 mx-auto>
            <v-card dark color = "accent">
              <v-layout flex wrap row justify-space-between>
              <v-flex xs6 sm4>
                <v-badge color = "success">
                  <span slot = "badge">{{ $parent.lives }}</span>
                    <v-icon color = "warning">
                        battery_charging_full
                    </v-icon>
                </v-badge>
                <v-badge color = "success">
                    <span slot = "badge">{{ $parent.score }}</span>
                    <span> {{ $parent.maxScore }} </span>
                </v-badge>
              </v-flex>
              <v-spacer></v-spacer>
              <v-tooltip top v-if = "!$parent.showResults">
                  <v-btn icon @click = "answerIsReady"
                              slot = "activator">
                      <v-icon>send</v-icon>
                  </v-btn>
                  <span>Готово</span>
              </v-tooltip>
              <v-tooltip top>
                  <v-btn icon @click = "nextLevel"
                              slot = "activator">
                      <v-icon>forward</v-icon>
                  </v-btn>
                  <span>Дальше</span>
              </v-tooltip>
              <v-tooltip top>
                  <v-btn icon @click = "$parent.exitQuiz"
                              slot = "activator">
                      <v-icon>exit_to_app</v-icon>
                  </v-btn>
                  <span>Выход</span>
              </v-tooltip>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
        <slot name = "snackbar"></slot>

        <v-snackbar slot = "snackbar"
                    :timeout = "50000"
                    auto-height
                    left
                    top
                    multi-line
                    vertical
                    color = "secondary"
                    v-if = "snackbar"
                    v-model = "snackbar">
            <v-badge xs1 color = "success" style = "width:22px;">
                  <span slot = "badge">{{ $parent.levelResults.right }}</span>
                  <v-icon color = "warning">
                      thumb_up
                  </v-icon>
            </v-badge>
            <v-badge xs1 color = "error" style = "width:22px;">
                  <span slot = "badge">{{ $parent.levelResults.wrong }}</span>
                  <v-icon color = "warning">
                      thumb_down
                  </v-icon>
              </v-badge>
            <v-btn  flat icon color = "warning"
                    @click.native = "snackbar = false">
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
      </v-container>
    `
}
export default quizTemplate
