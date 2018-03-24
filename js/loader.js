function transport () {
		return new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP")
}

this.counter = ( function () {
	var __counter__ = 0
	return function () { return __counter__++ }
}) ()

this.requestQueue = []

this.addEventListener ( 'message', function ( e ) {
	var num = this.counter ()
	console.info ( '*** LOADER: requestQueue [ ' + num + ' ]; sourse URL: ' + e.data )
	this.requestQueue [num] = transport ()
	this.requestQueue [num].sourceURL = e.data
	this.requestQueue [num].ready = 0

	this.requestQueue [num].onreadystatechange = function ( event ) {
		if ( this.readyState === 4 )
			this.ready = this.status === 200 ? 1 : -1
			if ( this.status === 200 )
					postMessage ( {
						status: true,
						url: this.sourceURL,
						response: this.responseText
					} )
			else {
				console.info ( '*** LOADER ERROR: requestQueue [ ' + num +
											' ] readyState: ' + this.readyState +
											 '; status: ' + this.status )
				postMessage ( { status: false, url: this.sourceURL } )
			}
	}
	this.requestQueue [num].open( "GET", this.requestQueue [num].sourceURL, false )
	this.requestQueue [num].send ()

}, false )
