(function(){
    'use strict'
   
    // PEGANDO O ELEMENTO NO HTML
    var btnLogout = document.getElementById('btnLogout');
      
    // LOGOUT DA APLICAÇÃO
    btnLogout.addEventListener('click', e =>{
        firebase.auth().signOut();
        window.location.assign('https://join-scholar.firebaseapp.com/');        
        //window.location.assign('http://127.0.0.1:5000/');
        });    
    
    })();