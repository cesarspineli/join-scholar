(function(){
  'user strict'
// INICILIZAR CONEXÃO COM O FIREBASE
var config = {
        apiKey: "AIzaSyA5E0iGlg_onfcpGoHpdwP_-tnjVgfU88I",
        authDomain: "join-scholar.firebaseapp.com",
        databaseURL: "https://join-scholar.firebaseio.com",
        projectId: "join-scholar",
        storageBucket: "join-scholar.appspot.com",
        messagingSenderId: "13136950990"
    };
    firebase.initializeApp(config);

// Get elements
var txtEmail = document.getElementById('txtEmail');
var txtPassword = document.getElementById('txtPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var spinner = document.getElementById('spinner');

// EVENTO SIGN IN
btnLogin.addEventListener('click', e =>{
// spinner.classList.add('is-active');
var email = txtEmail.value;
var password = txtPassword.value;
var auth = firebase.auth();
var promisse = auth.signInWithEmailAndPassword(email, password);
promisse.catch(e => console.log(e.message));
});

// EVENTO SIGN UP
btnSignUp.addEventListener('click', e=>{
// spinner.classList.add('is-active');
// TODO: FAZER VALIDAÇÃO DE EMAIL
var email = txtEmail.value;
var password = txtPassword.value;
var auth = firebase.auth();
var promisse = auth.createUserWithEmailAndPassword(email, password);
promisse.catch(e => console.log(e.message));
});

// LISTENER QUE MONITORA O STATUS DO LOGIN
firebase.auth().onAuthStateChanged(firebaseUser => {        

    if(firebaseUser!=null){       
        console.log('user logged');
       console.log(firebaseUser);
      window.location.assign('https://join-scholar.firebaseapp.com/app.html');
      //window.location.assign('http://127.0.0.1:5000/app.html');         

    }else{
        console.log('user not logged');
    };
    
});


//AUTENTICAÇÃO COM FACEBOOK

btnFbLogin.addEventListener('click', e =>{ 
var provider = new firebase.auth.FacebookAuthProvider();
 //firebase.auth().useDeviceLanguage(); 
 provider.addScope('public_profile');
 provider.addScope('email');    

 firebase.auth().signInWithPopup(provider).then(function(result) {
   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
   var token = result.credential.accessToken;
   // The signed-in user info.
   var user = result.user;
   // ...
 }).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // The email of the user's account used.
   var email = error.email;
   // The firebase.auth.AuthCredential type that was used.
   var credential = error.credential;
   // ...
 });
});

// //LOGOUT FACEBOOK
// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });  


 // LOGIN COM GOOGLE
 btnGoogleLogin.addEventListener('click', e =>{
   var provider = new firebase.auth.GoogleAuthProvider();
   firebase.auth().signInWithPopup(provider).then(function(result) {
     // This gives you a Google Access Token. You can use it to access the Google API.
     var token = result.credential.accessToken;
     // The signed-in user info.
     var user = result.user;
     // ...
   }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     // The email of the user's account used.
     var email = error.email;
     // The firebase.auth.AuthCredential type that was used.
     var credential = error.credential;
     // ...
   });
 });

// //LOGOUT GOOGLE
// firebase.auth().signOut().then(function() {
// // Sign-out successful.
// }).catch(function(error) {
// // An error happened.
// }); 



})();


