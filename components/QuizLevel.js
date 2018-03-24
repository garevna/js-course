'use strict'

import quizTemplate from './quizTemplate'

const QuizLevel = {
  props: [ "level" ],
  data: function () {
    return {
      selected: [],
      answer: "",
      lives: this.$root.$store.state.quizData.lives,
      score: this.$root.$store.state.quizData.score,
      maxScore: this.$root.$store.state.quizData.maxScore,
      showResults: false,
      levelResults: { right: 0, wrong: 0 }
    }
  },
  components: {
      'quiz-template': quizTemplate
  },
  computed: {
    quizData: function () {
      return JSON.parse( JSON.stringify( this.$parent.currentQuiz ) )
    },
    params: function () {
        var res = []
          if ( this.quizData.picture ) {
            res.push ({
                slotName: 'picture',
                tabIcon:'insert_photo'
            })
          }
          if ( this.quizData.codeJS ) {
              res.push ({
                  slotName: 'js',
                  tabSymbol: "{...}"
              })
          }
          if ( this.quizData.codeHTML ) {
              res.push ({
                  slotName: 'html',
                  tabIcon:'code'
              })
          }
          if ( this.quizData.type === 'choice' ) {
              res.push ({
                  slotName: 'choice',
                  tabIcon:'touch_app'
              })
          }
          if ( this.quizData.type === 'input' ) {
              res.push ({
                  slotName: 'text',
                  tabIcon:'keyboard'
              })
          }
          if ( this.quizData.type === 'findError' ) {
                res.push ({
                    slotName: 'findError',
                    tabIcon:'developer_board'
                })
          }
          return res
      }
  },
  methods: {
      validateAnswer: function () {
          switch ( this.quizData.type ) {
                case 'findError':
                    var result = this.quizData.wrongContent.map ( x => x.split ( ' ' ).join('') ).join('')
                    var etalon = this.quizData.rightContent.map ( y => y.split ( ' ' ).join('') ).join('')
                    var tst = result === etalon
                    this.levelResults = { right: 0 + tst, wrong: 0 + !tst }
                    break
                case 'choice':
                    this.levelResults = { right: 0, wrong: 0 }
                    for ( var i = 0; i < this.selected.length; i++ ) {
                      if ( this.quizData.rightChoicesNums.indexOf ( this.selected [i]) < 0 )
                            this.levelResults.wrong  += 1
                      else  this.levelResults.right  += 1
                    }
                    break
                case 'input':
                    var res = this.answer.split ( ' ' ).join('')
                    var tst = this.quizData.rightInput.split ( ' ' ).join('')
                    var x = res === tst
                    this.levelResults = { right: 0 + x, wrong: 0 + !x }
                    break
                default:
                    break
          }
          this.$root.$store.commit ( 'saveQuizResults', {
                score: this.levelResults.right * this.quizData.balls,
                lives: this.levelResults.wrong
          })
          this.lives = this.$root.$store.state.quizData.lives
          this.score = this.$root.$store.state.quizData.score
          this.showResults = true
          this.snackbar = true
          if ( this.lives === 0 ) this.$parent.$emit ( 'looser' )
      },
      nextLevel: function () {
          this.answer = ""
          this.selected = []
          this.$parent.$emit ( 'next-level' )
      },
      exitQuiz: function () {
          this.$root.$emit ( 'exit-quiz' )
      }
  },
  template: `
    <quiz-template :params = "params">
        <v-card-text slot = "question">
              {{ quizData.question }}
        </v-card-text>

        <v-card-text slot = "choice">
            <v-checkbox
                 v-for = "( ch, ind ) in quizData.choiceVariants"
                        :key = "ind"
                        :label = "ch"
                        :value = "ind"
                        hide-details
                        v-model = "selected">
            </v-checkbox>
        </v-card-text>

        <v-card-media slot = "picture" v-if = "quizData.picture"
                      :src = "quizData.picture" :height = "${window.innerHeight*0.7}">
        </v-card-media>

        <v-card-text slot = "text" v-if = "quizData.type === 'input'">
            <v-text-field :suffix = "quizData.inputLegend ?
                                     quizData.inputLegend.after : ''"
                          :prefix = "quizData.inputLegend ?
                                     quizData.inputLegend.before : ''"
                          box
                          v-model = "answer"
                          style = "max-width:fit-content;">
            </v-text-field>
        </v-card-text>

        <v-card-text slot = "html" v-if = "quizData.codeHTML">
          <pre v-for = "( line, i ) in quizData.codeHTML"
               :key = "i"
               v-text = "line">
          </pre>
        </v-card-text>

        <v-card-text slot = "js" v-if = "quizData.codeJS">
           <pre v-for="( item, index ) in quizData.codeJS"
                :key = "index"
                v-text = "item">
           </pre>
        </v-card-text>

        <v-card-text slot = "findError" v-if = "quizData.type === 'findError'">
           <v-card-text>
            <div v-for = "( item, index ) in quizData.wrongContent"
                 :key = "index">
              <v-text-field :name = "index"
                            class = "success"
                            hide-details solo
                            row-height = "18"
                            v-model = "quizData.wrongContent [ index ]">
              </v-text-field>
            </div>
          </v-card-text>
        </v-card-text>

      </quiz-template>
  `
}
export default QuizLevel
