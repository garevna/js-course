const BaseDropdownMenu = ( 'dropdown-menu', {
  props: {
    buttonClass: {
      type: String,
      default:'left-dropdown-menu-button'
    },
    menuClass: {
      type: String,
      default:'left-dropdown-menu'
    },
    optionsClass: {
      type: String,
      default:'dropdown-menu-item'
    },
    transitionName: {
      type: String,
      default:'slideLeft'
    },
    options: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      visibleStatus: false
    }
  },
  methods: {
    changeMenuVisibility: function ( event ) {
      this.visibleStatus = !this.visibleStatus
    },
    hideMenu: function ( event ) {
      this.visibleStatus = false
    }
  },
  mounted: function () {
    this.$on ( 'menuSelect', function ( val ) {
      this.visibleStatus = false
      this.$parent.$emit ( 'menuSelect', val )
    })
  },
  components: {
    'menu-option': {
      props: {
        val: {
          type: String,
          required: true
        },
        css: {
          type: String,
          default:'dropdown-menu-item'
        },
        transitionName:{
          type: String,
          default:'slideLeft'
        }
      },
      methods: {
        clickHandler: function ( event ) {
          this.$parent.$emit ( 'menuSelect',
                  event.target.innerHTML.trim() )
        }
      },
      template:`
        <transition :name="transitionName">
          <li :class="css"
                @click="clickHandler">
              {{ val }}
          </li>
        </transition>
      `
    }
  },
  template: `
    <div>
      <button :class="buttonClass"
          @click="changeMenuVisibility">
      </button>
      <div :class="menuClass" @mouseleave="hideMenu">
          <menu-option
              v-for = "item in options"
              :val="item"
              :css="optionsClass"
              :key="item"
              v-if = "visibleStatus"
              :transitionName="transitionName">
          </menu-option>
      </div>
	  </div>
  `
})
