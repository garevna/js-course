function menuAppearFromCenter ( menuElement ) {
  var margins = [ 45, 45, 45, 45 ]
  var __opacity = 0
  function setSize ( marg, __opacity ) {
    menuElement.style.top = marg [0] + "%"
    menuElement.style.bottom = marg [2] + "%"
    menuElement.style.right = marg [1] + "%"
    menuElement.style.left = marg [3] + "%"
    menuElement.style.opacity = "" + __opacity
  }
  function init () {
    menuElement.className = "popup-window"
    menuElement.style.overflow = "hidden"

    setSize ( margins, __opacity )
  }

  init ()
  var __interval = setInterval ( function () {
    margins [0] -= margins [0] < 9 ? 0 : 1
    margins [1] -= margins [1] < 5 ? 0 : 1
    margins [2] -= margins [2] < 9 ? 0 : 1
    margins [3] -= margins [3] < 5 ? 0 : 1
    __opacity += __opacity === 1 ? 0 : 0.1
    if ( margins [0] < 9 && margins [1] < 5 ) {
      clearInterval ( __interval )
      menuElement.style.overflow = "auto"
      __opacity = 1
      menuElement.style.opacity = "1"
      var closeButton = document.createElement ( 'button' )
      closeButton.className = "popup-window-closeButton"

      closeButton.objToRemove = menuElement

      document.body.appendChild ( closeButton )

      closeButton.onclick = function ( event ) {
        var removingObject = this.objToRemove
        removingObject.style.overflow = "hidden"
        var __interval = setInterval ( function () {
          margins [0] += margins [0] > 48 ? 0 : 1
          margins [1] += margins [1] > 48 ? 0 : 1
          margins [2] += margins [2] > 48 ? 0 : 1
          margins [3] += margins [3] > 48 ? 0 : 1
          __opacity -= 0.1
          if ( margins [0] > 48 && margins [1] > 48 && __opacity < 0.1 ) {
            clearInterval ( __interval )
            removingObject.parentNode.removeChild ( removingObject )
          } else setSize ( margins, __opacity )
        }, 20 )
        this.parentNode.removeChild ( this )
      }
    }
    else setSize ( margins, __opacity )
  }, 20 )
}
