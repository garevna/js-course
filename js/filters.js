Vue.filter('spacingLine', function ( value ) {
  return value.replace(/ /g,"&nbsp;")
})
