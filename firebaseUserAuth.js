const config = {
          apiKey: "AIzaSyAE1LDfl-AWDIaauE6CUGWPDvJU4sdDnLE",
          authDomain: "vue-course-b1571.firebaseapp.com",
          databaseURL: "https://vue-course-b1571.firebaseio.com",
          projectId: "vue-course-b1571",
          storageBucket: "vue-course-b1571.appspot.com",
          messagingSenderId: "329391650263"
}
const firebaseApp = firebase.initializeApp ( config )
const firebaseDB = firebaseApp.database()
const usersRef = firebaseDB.ref ( 'users' )
const messagesRef = firebaseDB.ref ( 'message' )

console.log ( 'firebaseApp usersRef: ', usersRef )
console.log ( 'firebaseApp messagesRef: ', messagesRef )

var uiConfig = {
        signInSuccessUrl: '/vue-course.github.io/#/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url
        tosUrl: '/vue-course.github.io/'
}

var ui = new firebaseui.auth.AuthUI ( firebase.auth () )

// The start method will wait until the DOM is loaded

ui.start( '#firebaseui-auth-container', uiConfig )

initApp = function () {
    firebase.auth().onAuthStateChanged ( function ( user ) {
       if ( user ) {
            var displayName = user.displayName
            var email = user.email
            var emailVerified = user.emailVerified
            var photoURL = user.photoURL
            var uid = user.uid
            var phoneNumber = user.phoneNumber
            var providerData = user.providerData
            user.getIdToken().then ( function ( accessToken ) {
                      console.log ( 'app.sendMessage: ', app.sendMessage )
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                phoneNumber: phoneNumber,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
              }, null, '  ')
            })
          } else {
            // User is signed out
            document.getElementById('sign-in-status').textContent = 'Signed out'
            document.getElementById('sign-in').textContent = 'Sign in'
            document.getElementById('account-details').textContent = 'null'
          }
        }, function ( error ) {
            console.log ( error )
        })
}
