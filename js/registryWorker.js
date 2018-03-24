//  Scripts and Styles needed for level_2.html

var styleSheets = [
	"./css/main.css",
	"./css/sectionInfo.css",
	"./css/sectionDetails.css",
	"./css/transitions.css",
	"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",
	"https://unpkg.com/vuetify/dist/vuetify.min.css",
	"https://fonts.googleapis.com/css?family=Abel|Amatic+SC|Caveat|Comfortaa|Didact+Gothic|Kurale|Montserrat|Pacifico"
]

var externalScripts = [
	{ src: "https://unpkg.com/vue/dist/vue.min.js", id: "vue" },
	{ src: "https://cdn.jsdelivr.net/vue.resource/1.2.1/vue-resource.min.js", id: "vue-resource" },
	{ src: "https://unpkg.com/vue-router/dist/vue-router.min.js", id: "vue-router" },
	{ src: "https://unpkg.com/vuex@3.0.1/dist/vuex.min.js", id: "vuex" },
	{ src: "https://unpkg.com/vuetify/dist/vuetify.min.js", id: "vuetify" }
]

var scripts = [
	//{ src: "./js/library.js", functions: [ "menuAppearFromCenter" ], toBody: true },

	//{ src: "./components/CustomSelect.js", toBody: true, dependOn: [] },
	//{ src: "./components/appFooter.js", toBody: true, dependOn: [] },
	//{ src: "./components/NavigationPanel.js", toBody: true, dependOn: [] },
	//{ src: "./components/toggleButtons.js", toBody: true, dependOn: [] },
	//{ src: "./components/bottomSheet.js", toBody: true, dependOn: [] },
	//{ src: "./components/FullScreenDialogWindow.js", toBody: true, dependOn: [] },
	//{ src: "./components/HomePage.js", toBody: true, dependOn: [] },
	//{ src: "./components/currentPost.js", toBody: true, dependOn: [] },
	//{ src: "./components/SectionInfo.js", toBody: true, dependOn: [] },
	//{ src: "./components/SectionDetails.js", toBody: true, dependOn: [] },
	//{ src: "./components/mainSection.js", toBody: true, dependOn: [] },
	//{
	//	src: "DataStore.js",
	//	toBody: true,
	//	id: "store",
	//	dependOn: [ "vuex" ]
	//},
	//{
	//	src: "./components/routerInstance.js",
	//	toBody: true,
	//	id: "router",
	//	dependOn: [ "vue-router" ]
	//},
	//{
	//	src: "VueInstance.js",
	//	toBody: true,
	//	id: "root",
	//	dependOn: [ "store", "router" ]
	//},
	//{
	//	src: "./js/filters.js",
	//	toBody: true,
	//	dependOn: [ "root" ]
	//}
]

for ( var i = 0; i < styleSheets.length; i++ ) {
	this.postMessage ( { type: "style", src: styleSheets [i] } )
}
for ( var j = 0; j < externalScripts.length; j++ ) {
	this.postMessage ( { type: "script", external: true, src: externalScripts [j].src, toBody: false  } )
}
for ( var j = 0; j < scripts.length; j++ ) {
	this.postMessage ( { type: "script", external: true, src: scripts [j].src, toBody: scripts [j].toBody } )
}
