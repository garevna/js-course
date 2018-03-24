'use strict'

const quizFinish = {
    props: [ "status", "results" ],
    data: function () {
      return {
          pictureHeight: 0,
          picture:'',
          pict: {
            finish: 'gameOverPictureURL',
            looser: 'failurePictureURL',
            winner: 'successPictureURL'
          },
          text: {
            finish: 'FINISH',
            looser: 'YOU LOOSE',
            winner: 'YOU WIN!'
          }
      }
    },
    computed: {
        header: function () {
            return this.text [ this.status ]
        }
    },
    mounted: function () {
        this.picture = this.$root.$store.state.quizData [ this.pict [ this.status ] ]
        this.pictureHeight = Math.round ( window.innerHeight * 0.7 )
        //console.info(`${this.pictureHeight}`)
    },
    methods: {
      onResize: function () {
          this.pictureHeight = Math.round ( window.innerHeight * 0.7 )
      },
      exitQuiz: function () {
          this.$root.$emit ( 'exit-quiz' )
      },
    },
    template: `
      <v-container v-resize="onResize" class = "transparent" @click = "exitQuiz">
        <v-card>
            <v-card-media :src = "picture" :height = "pictureHeight">
                <v-container fill-height fluid class = "transparent">
                    <v-layout fill-height>
                      <v-flex xs12 text-xs-center flexbox mt-3>
                        <h1 class = "headline white--text text--shadow ma-4"
                              v-text = "header">
                        </h1>
                        <section v-if = "status === 'finish'" class = "text--shadow">
                          <span class = "headline warning--text text--shadow">
                              <v-icon x-large class = "warning--text">assessment</v-icon> {{ results.score }}
                          </span>
                          &nbsp;&nbsp;&nbsp;
                          <span class = "headline accent--text text--shadow">
                          <v-icon x-large class= "accent--text">stars</v-icon> {{ results.maxScore }}
                          </span>
                          <v-spacer></v-spacer>
                          <p class = "headline white--text text--shadow">
                              <v-icon x-large>battery_charging_full</v-icon> {{ results.lives }}
                          </p>
                        </section>
                      </v-flex>
                    </v-layout>
                  </v-container>
            </v-card-media>
        </v-card>
      </v-container>
    `
}
export default quizFinish
