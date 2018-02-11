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
