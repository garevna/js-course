const quizFinish = ( 'quiz-finish', {
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
            <v-card-media
                  :src = "picture" :height = "pictureHeight">
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
                    </v-layout>
                  </v-container>
            </v-card-media>
        </v-card>
      </v-container>
    `
})

const quizTemplate = ( 'quiz-template', {
    props: [ "params" ],
    data: function () {
      return {
        activeTab: null,
        snackbar: null
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
      <v-container grid-list-sm mx-auto pa-4
                 class = "transparent"
                 style = "position:fixed;
                          top:0;left:0;
                          bottom:5%;right:0">
        <v-flex d-flex xs12 mx-auto>
          <v-card dark color = "warning">
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
            </v-card>
          </v-flex>
        </v-layout>
        <slot name = "snackbar"></slot>

        <v-snackbar slot = "snackbar"
                    :timeout = "60000"
                    auto-height
                    left = true
                    top = true
                    multi-line = true
                    vertical = true
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
})

// =========================================================== quizContent
const QuizLevel = ( 'quiz-level', {
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
                    console.info ( result )
                    console.info ( etalon )
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
})

var QuizComponent = ( 'quiz-component', {
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
        results: function () {
            return {
                maxScore: this.$root.$store.state.quizData.maxScore,
                score: this.$root.$store.state.quizData.score,
                lives: this.$root.$store.state.quizData.lives
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
    methods: {
    },
    components: {
        'perspective-dynamic-fone': PerspectiveDynamicFone,
        'quiz-level': QuizLevel,
        'quiz-finish': quizFinish
    },
    mounted: function () {
        this.lives = this.$root.$store.state.quizData.lives
        this.score = this.$root.$store.state.quizData.score
        this.maxScore = this.$root.$store.state.quizData.maxScore

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
})
