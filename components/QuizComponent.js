'use strict'

import { TweenMax, Power2, TimelineLite } from "gsap"
import styles from '../css/quiz.css'

import PerspectiveDynamicFone from './PerspectiveDynamicFone'
import QuizLevel from './QuizLevel'
import quizFinish from './quizFinish'

const QuizComponent = {
    props: [ "perspectiveReady", "quizReady" ],
    data: function () {
        return {
            level: 1,
            score: this.$root.$store.state.quizData.score,
            lives: this.$root.$store.state.quizData.lives,
            startQuiz: false,
            quizData: this.$root.$store.state.quizData,
            showQuize: true,
            showResults: false,
            status: 'work',
            finish: null
        }
    },
    computed: {
        currentQuiz: function () {
            return this.quizData.levels [ this.level - 1 ]
        },
        maxScore: function () {
            return this.$root.$store.state.quizData.maxScore
        },
        results: {
          get: function () {
            return {
                maxScore: this.$root.$store.state.quizData.maxScore,
                score: this.$root.$store.state.quizData.score,
                lives: this.$root.$store.state.quizData.lives
            }
          },
          set: function ( params ) {
            //console.log ( params )
            //this.$root.$store.commit ( 'saveQuizResults', params )
          }
        },
    },
    template: `
      <div v-if = "showQuize">
        <perspective-dynamic-fone :level = "level">
        </perspective-dynamic-fone>
        <quiz-level :quizData = "currentQuiz"
                      :level = "level"
                      v-if = "startQuiz">
        </quiz-level>
        <quiz-finish v-if = 'finish'
                     :status = "status"
                     :results = "results">
        </quiz-finish>
    </div>
    `,
    components: {
        'perspective-dynamic-fone': PerspectiveDynamicFone,
        'quiz-level': QuizLevel,
        'quiz-finish': quizFinish
    },
    mounted: function () {
        this.lives = this.$root.$store.state.quizData.lives
        this.score = this.$root.$store.state.quizData.score
        //this.maxScore = this.$root.$store.state.quizData.maxScore

        this.$on ( 'start-quiz', function () {
            this.startQuiz = true
        })
        this.$on ( 'looser', function () {
            this.status = 'looser'
            this.finish = true
        })
        this.$on ( 'save-quiz-level-results', function ( results ) {
          this.$root.$store.commit ( 'saveQuizResults', results )
        })
        this.$on ( 'next-level', function () {
          this.lives = this.$root.$store.state.quizData.lives
          this.score = this.$root.$store.state.quizData.score
          if ( this.lives <= 0 ) {
            this.status = 'looser'
            this.finish = true
          }
          else {
            this.startQuiz = false
            this.level += 1
            this.results = {
                maxScore: this.$root.$store.state.quizData.maxScore,
                score: this.$root.$store.state.quizData.score,
                lives: this.$root.$store.state.quizData.lives
            }
            if ( this.level > this.quizData.levels.length ) {
                this.status = this.results.score === this.results.maxScore ? 'winner' : 'finish'
                this.finish = true
                this.startQuiz = false
            }
          }
        })
        this.$root.$on ( 'exit-quiz', function () {
            this.showQuize = false
        })
    }
}
export default QuizComponent
