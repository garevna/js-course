const config = {
          apiKey: "AIzaSyAE1LDfl-AWDIaauE6CUGWPDvJU4sdDnLE",
          authDomain: "vue-course-b1571.firebaseapp.com",
          databaseURL: "https://vue-course-b1571.firebaseio.com",
          projectId: "vue-course-b1571",
          storageBucket: "vue-course-b1571.appspot.com",
          messagingSenderId: "329391650263"
}
// =============================
var firebaseProviderData = null
// =============================     
const firebaseApp = firebase.initializeApp ( config )
const firebaseDB = firebaseApp.database()
const usersRef = firebaseDB.ref ( 'users' )
const messagesRef = firebaseDB.ref ( 'message' )

console.log ( 'firebaseApp usersRef: ', usersRef )
console.log ( 'firebaseApp messagesRef: ', messagesRef )

//var uiConfig = {
//        signInSuccessUrl: '/vue-course.github.io/#/',
//        signInOptions: [
//            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//            firebase.auth.GithubAuthProvider.PROVIDER_ID,
//            firebase.auth.EmailAuthProvider.PROVIDER_ID,
//        ],
        // Terms of service url
//        tosUrl: '/vue-course.github.io/'
//}

//var ui = new firebaseui.auth.AuthUI ( firebase.auth () )
//console.log ( 'instance of firebaseui.auth.AuthUI: ', ui )

// The start method will wait until the DOM is loaded

//ui.start( '#firebaseui-auth-container', uiConfig )
