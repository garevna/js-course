'use strict'

import styles from '../css/perspective.css'

const PerspectiveDynamicFone = {
    props: [ "level" ],
    data: function () {
        return {
            personage: 'images/astronaut.gif',
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            mouseX: 0,
            mouseY: 0,
            quizIsActive: false,
            currentMouseOverElementId: 'perspectiveLeftSide',
            waitForPerspectiveData: null,
            activeLeftBackground: '',
            activeRightBackground: '',
            activeTopBackground: '',
            activeBottomBackground: '',
            activeCenterBackground: ''
        }
    },
    template: `
        <section>
          <div id = "main_perspective" @mousemove = "mouseMoveHandler">
            <div id = "perspective_container" @mousemove = "animationPlay">
                 <div id = "perspectiveLeftSide" @mouseover = "changeCurrentMouseOverElementId"
                      :style = "{ backgroundImage: 'url(' + activeLeftBackground + ')' }">
                 </div>
                 <div id = "perspectiveRightSide" @mouseover = "changeCurrentMouseOverElementId"
                      :style = "{ backgroundImage: 'url(' + activeRightBackground + ')' }">
                 </div>
                 <div id = "perspectiveTopSide" @mouseover = "changeCurrentMouseOverElementId"
                      :style = "{ backgroundImage: 'url(' + activeTopBackground + ')' }">
                 </div>
                 <div id = "perspectiveBottomSide" @mouseover = "changeCurrentMouseOverElementId"
                      :style = "{ backgroundImage: 'url(' + activeBottomBackground + ')' }">
                 </div>
                 <div id = "perspectiveCenterSide" @mouseover = "changeCurrentMouseOverElementId"
                      :style = "{ backgroundImage: 'url(' + activeCenterBackground + ')' }"
                      @click = "startQuiz">
                 </div>
            </div>
        </div>
        <div id = "perspectivePersonage"
             :style = "[ personagePicture, personageCoords, personageVisibility ]"
             @click = "startQuiz">
        </div>
      </section>
    `,
    watch: {
        level: function ( newVal, oldVal ) {
            var pict = this.$root.$store.state.perspectiveImages.getPictures ()
            this.activeCenterBackground = pict.center
            this.activeLeftBackground = pict.side
            this.activeRightBackground = pict.side
            this.activeTopBackground = pict.side
            this.activeBottomBackground = pict.side

            this.quizIsActive = false
        }
    },
    computed: {
        personagePicture: function () {
            return {
                backgroundImage: "url(" + this.personage + ")"
            }
        },
        personageVisibility: function () {
            return {
                display: this.quizIsActive ? "none" : "block"
            }
        },
        personageCoords: function () {
            return {
                top: this.mouseY + 'px',
                left: this.mouseX + 'px',
            }
        },
        normalSize: function () {
            return Math.round ( Math.min ( this.winWidth, this.winHeight ) * 0.2 )
        },
        largeSize: function () {
            return this.normalSize * 3
        },
        largeSizeTop: function () {
            return Math.round ( ( this.winHeight - this.largeSize )/2 )
        },
        largeSizeLeft: function () {
            return Math.round ( ( this.winWidth - this.largeSize )/2 )
        },
        __top: function () {
            return Math.round ( ( this.winHeight - this.normalSize )/2 )
        },
        dy: function () {
            return Math.round ( this.__top * 0.5 )
        },
        __left: function () {
            return Math.round ( ( this.winWidth - this.normalSize )/2 )
        },
        dx: function () {
            return Math.round ( this.__left * 0.5 )
        },
        coords: function () {
            return {
                perspectiveCenterSide: [
                    this.largeSizeTop + 'px',
                    this.largeSizeLeft + 'px',
                    this.largeSize + 'px'
                ],
                perspectiveTopSide: [
                    this.__top - this.dy + 'px',
                    this.__left + 'px',
                    this.normalSize + 'px'
                ],
                perspectiveRightSide: [
                    this.__top + 'px',
                    this.__left + this.dx + 'px',
                    this.normalSize + 'px'
                ],
                perspectiveBottomSide: [
                    this.__top + this.dy + 'px',
                    this.__left + 'px',
                    this.normalSize + 'px'
                ],
                perspectiveLeftSide: [
                    this.__top + 'px',
                    this.__left - this.dx + 'px',
                    this.normalSize + 'px'
                ]
            }
        },
        containerStyleParams: function () {
            return {
                __marginTop: this.coords [ this.currentMouseOverElementId ][0],
                __marginleft: this.coords [ this.currentMouseOverElementId ][1],
                __width: this.coords [ this.currentMouseOverElementId ][2],
                __height: this.coords [ this.currentMouseOverElementId ][2]
            }
        },
        personage: function () {
            if ( !this.$root.$store.state.perspectiveData ) return "/vue-course.github.io/images/astronaut.gif"
            return this.$root.$store.state.perspectiveData.personage
        },
    },
    methods: {
        startQuiz: function () {
            if ( this.currentMouseOverElementId === 'perspectiveCenterSide' ) {
                this.quizIsActive = true
                this.$parent.$emit ( 'start-quiz', this.level )
            }
        },
        mouseMoveHandler: function ( event ) {
            this.mouseX = event.clientX
            this.mouseY = event.clientY
        },
        changeCurrentMouseOverElementId: function ( event ) {
            this.currentMouseOverElementId = event.target.id
        },
        handleResize: function () {
            this.winWidth = window.innerWidth
            this.winHeight = window.innerHeight
        },
        animationPlay: function ( event ) {
            var elem = event.target
            if ( elem.id !== 'perspective_container' ) {
                elem = event.target.parentNode
            }
            TweenLite.to( elem, 2, {
                     marginTop:  this.containerStyleParams.__marginTop,
                     marginLeft: this.containerStyleParams.__marginleft,
                     width:      this.containerStyleParams.__width,
                     height:     this.containerStyleParams.__height
            })
        }
    },
    mounted: function () {
        var pict = this.$root.$store.state.perspectiveImages.getPictures ()
        this.activeCenterBackground = pict.center
        this.activeLeftBackground = pict.side
        this.activeRightBackground = pict.side
        this.activeTopBackground = pict.side
        this.activeBottomBackground = pict.side
        window.addEventListener( 'resize', this.handleResize )
    },
    beforeDestroy: function () {
          window.removeEventListener( 'resize', this.handleResize )
    }
}
export default PerspectiveDynamicFone
