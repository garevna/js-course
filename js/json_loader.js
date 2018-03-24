function transport () {
		return XMLHttpRequest ? new XMLHttpRequest () :
                     new ActiveXObject ( "Microsoft.XMLHTTP" )
}

this.addEventListener( 'message', function ( e ) {
    var sourceURL = e.data
	  var $request = transport ()
    $request.onreadystatechange = function () {
        if ( $request.readyState == 4 )
            if ( $request.status == 200 )
                postMessage ( JSON.parse ( $request.responseText) )
		        else postMessage(null)
	}
	$request.open ( "GET", sourceURL )
	$request.send ()
} )
