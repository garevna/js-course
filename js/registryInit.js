document.scriptsRegistry = new scriptsRegistry ()
document.stylesheetsRegistry = new stylesheetsRegistry ()

document.worker = new Worker ( './js/registryWorker.js' )
document.worker.onmessage = function ( mess ) {
	if ( mess.data.type === 'script' ) {
		document.scriptsRegistry.registerScript ( {
					src: mess.data.src,
					external: true,
					functions: mess.data.functions || [],
					defer: mess.data.defer || false,
					async: mess.data.async || true,
					toBody: mess.data.toBody || false
		} )
	}

	else
		document.stylesheetsRegistry.registerStyleSheet ( mess.data )
}
