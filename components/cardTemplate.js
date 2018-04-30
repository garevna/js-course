'use strict'

const cardTemplate = ( 'card-template', {
    props: [ "text", "picture" ],
    data: function () {
        return {
          winWidth: window.innerWidth,
          winHeight: window.innerHeight,
          TEXT_MARGIN_Y: 25,
          elem: null,
          elemParams: {
              height:0,
              width:0,
              top:0,
              left:0
          },
          textElem: null,
          textElemHeight: 0,
          pictureURL: "url()",
          pictureMarginLeft: "0"
        }
    },
    watch: {
      'text': function ( newVal, oldVal ) {
          if ( !newVal ) return
          this.elem = document.querySelector ( '#scroll-container' )
          this.textElem = document.querySelector ( '.scrolled-text-element' )
          this.$nextTick ( function () {
              this.getTextHeight ()
          })
      },
      'picture': function ( newVal, oldVal ) {
          if ( !newVal ) return
          this.pictureURL = "url(" + newVal + ")"
      },
    },
    computed: {
        containerHeight: function () {
            return Math.min ( this.textElemHeight, this.winHeight * 0.7 ) + "px"
        },
        pictureSize: function () {
            return [
                Math.min ( this.winWidth * 0.2, 200 ),
                Math.min ( this.winHeight * 0.2, 200 )
            ]
        },
        pictureHeight: function () { return this.pictureSize [1] + "px" },
        pictureWidth: function () { return this.pictureSize [0] + "px" },
    },
    mounted: function () {
        this.pictureURL = this.picture ? "url(" + this.picture + ")" : null
        this.$root.$on ( 'win-resize', () => {
            this.winResized ()
        })
        this.winResized ()
    },
    methods: {
        winResized: function () {
            this.winWidth = window.innerWidth
            this.winHeight = window.innerHeight
            this.getContainerSize ()
            this.getTextHeight ()
            this.pictureMarginLeft = window.innerWidth < 960 ? "40%" : "-25px"
        },
        getContainerSize: function () {
            this.elem = document.querySelector ( '#scroll-container' )
            if ( this.elem ) {
                this.elemParams.height = this.elem.offsetHeight
                this.elemParams.width = this.elem.offsetWidth
                this.elemParams.top = this.elem.offsetTop
                this.elemParams.left = this.elem.offsetLeft
            }
        },
        getTextHeight: function () {
            this.textElem = document.querySelector ( '.scrolled-text-element' )
            this.textElemHeight = this.textElem ?
                    this.textElem.scrollHeight + this.TEXT_MARGIN_Y * 2 : 200
        },
    },
    template: `
      <div>
          <v-container grid-list-xl text-xs-justify v-if = "picture" style="overflow:hidden">
              <v-layout row wrap>
                <v-flex xs12 sm12 md9 offset-md0
                         :style = "{ height: containerHeight, overflow: 'auto' }">
                  <v-card id = "scroll-container"
                          class = "transparent elevation-0">
                    <v-card-text  class = "scrolled-text-element"
                                  v-html = "text">
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex md2 offset-md0 mx-auto>
                    <div  :style = "{ backgroundImage: pictureURL, backgroundSize: 'contain', height: pictureHeight, width: pictureWidth, marginLeft: pictureMarginLeft }">
                    </div>
                </v-flex>
              </v-layout>
          </v-container>
          <v-container grid-list-xl text-xs-justify v-if = "!picture" >
              <v-layout row wrap>
                <v-flex xs12 sm12 md10 offset-md1>
                  <v-card class="transparent elevation-0">
                    <v-card-text v-html = "text"></v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
          </v-container>
      </div>
    `
})
export default cardTemplate
