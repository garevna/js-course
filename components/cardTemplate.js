'use strict'

const cardTemplate = ( 'card-template', {
    props: [ "text", "picture" ],
    data: function () {
        return {
          offsetTop: 0,
          winHeight:0,
          winWidth: 0,
          elem: null,
          elemParams: {
            height:0,
            width:0,
            top:0,
            left:0
          },
          textElem: null,
          textElemHeight: 0,
          image: null,
          pictureSize: 0,
          rootSection: null,
          styles: null
        }
    },
    watch: {
      'picture': function ( newVal, oldVal ) {
          var src = window.innerWidth < 480 ? null : newVal
          this.image.style.backgroundImage = 'url(' + src + ')'
      },
      'text': function ( newVal, oldVal ) {
          this.$nextTick ( function () {
              this.resizeScrolledElements()
          })
      }
    },
    mounted: function () {
        this.rootSection = document.querySelector( ':root' )
        this.styles = this.rootSection.style

        this.elem = document.querySelector ( '#scroll-target' )
        this.textElem = document.getElementsByClassName ( "textContainer" ) [0]
        this.image = document.getElementsByClassName ( "scrolledPicture" ) [0]
        this.resizeScrolledElements()
        this.styles.setProperty( '--textPaddingLeft', 20 + 'px' )
        this.$root.$on ( 'win-resize', () => {
            this.resizeScrolledElements()
        })
    },
    methods: {
        resizeScrolledElements: function () {
            this.elemParams.height = this.elem.offsetHeight
            this.elemParams.width = this.elem.offsetWidth
            this.elemParams.top = this.elem.offsetTop
            this.elemParams.left = this.elem.offsetLeft
            this.winHeight = window.innerHeight - 300
            this.winWidth = window.innerWidth - 100
            this.textElemHeight = this.textElem.scrollHeight + 40
            var h = Math.max ( Math.min ( this.textElemHeight, this.winHeight ), this.pictureSize )
            this.styles.setProperty( '--winHeight', h + 'px' )
            if ( !this.picture ) return
            else this.changePictureSize ()
        },
        changePicture: function () {

            if ( !this.picture ) this.styles.setProperty( '--textPaddingLeft', 20 + 'px')
            else  this.changePictureSize()
        },
        changePictureSize: function () {
            var src = window.innerWidth < 480 ? null : this.picture
            this.image.style.backgroundImage = 'url(' + src + ')'
            this.pictureSize = window.innerWidth < 480 ? 0 : this.winWidth * 0.1
            this.styles.setProperty( '--pictureSize', this.pictureSize + 'px' )
            this.styles.setProperty( '--textPaddingLeft', ( this.pictureSize + 10 ) + 'px')
            this.styles.setProperty( '--pictureLeft', ( this.elemParams.left + 10 ) + 'px' )
            this.styles.setProperty( '--pictureTop', ( this.elemParams.top + 30 ) + 'px' )
        },
        onScroll (e) {
            this.offsetTop = e.target.scrollTop
            if ( !this.picture ) return
            this.styles.setProperty( '--pictureLeft', ( this.elemParams.left + 10 ) + 'px' )
            this.styles.setProperty( '--pictureTop', ( this.elemParams.top + 30 ) + 'px' )
        }
    },
    template: `
        <v-container class = "resized scroll-y"
                     v-scroll:#scroll-target="onScroll"
                     id="scroll-target">
            <div class = "textContainer" v-html = "text"></div>
            <div class = "scrolledPicture"></div>
        </v-container>
    `
})
export default cardTemplate
