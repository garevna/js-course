var routerSample = new Vue ({
  el: '#router-sample',
  store: routerSampleStore,
  data: function () {
    return {
      console.log ( 'Store data: ', this.$store.state.items )
      localData: JSON.parse( JSON.stringify(
              this.$store.state.items ) ),
      hideItem1:true,
      hideItem2:true,
      hideItem3:true,
    }
  },
  methods: {
    changeView: function ( elemId ) {
      hideItem = event.target.className === "minus-button"
      event.target.className = hideItem ? 
                "plus-button" : "minus-button"
      var property = `--y`
      if ( document.getElementById ( elemId ) ) {
        var size = document.getElementById ( elemId ).offsetHeight
      }
      else size = Math.round ( window.innerHeight * 0.7 )
      document.documentElement.style.removeProperty ( property )
      document.documentElement.style.setProperty ( property, size + 'px' )
      return hideItem
    },
    changeData: function ( field ) {
      this.localData [ field ] = event.target.value
      this.$store.commit( 'updateData', {
                  field: field,
                  value: event.target.value
              })
    }
  },
  mounted: function () {
    console.log ( 'Vue instance data: ', this.localData )
  }
})
