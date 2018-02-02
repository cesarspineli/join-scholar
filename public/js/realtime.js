(function () {
    'use strict';

    // PEGANDO ELEMENTOS DO HTML PRA ATRIBUIÇÃO
    var feedList = document.getElementById('feedList');
    var textFeed = document.getElementById('textFeed');
    var postButton = document.getElementById('postButton');
    var listFeed = document.getElementById('listFeed');
    var txtNome = document.getElementById('nome');
    var txtUniversidade = document.getElementById('universidade');
    var txtCurso = document.getElementById('curso');
    var txtSite = document.getElementById('website');
    var txtBio = document.getElementById('bio');
    var btnSaveUserInfo = document.getElementById('btnSaveUserInfo');
    var userInfoList = document.getElementById('userInfoList');
    var imgProfile = document.getElementById('imgProfile');

    var dialogUserInfo = document.querySelector('#dialogUserInfo');



    // DECLARAÇÃO VARIAVEIS GLOBAIS
    var userId, 
        userName, 
        userText, 
        userEmail, userSite, userPhoto, userBio, userUniversity, userCourse, urlFile, fileName, descrFile, profileId;



var chave;

//ADICIONAR FOTO AO PERFIL
    var fileInputImage = document.getElementById('fileInputImage');
    var btnUpdatePhoto = document.getElementById('btnUpdatePhoto');
 
    btnUpdatePhoto.addEventListener('click', function () {
      sendImage(fileInputImage);     
    });
     
   

    // CRIANDO REFERENCIA DOS USUARIOS NO FIREBASE
    var dbRefUsers = firebase.database().ref().child('users');
    var dbRefUserApp = dbRefUsers.child('user');


    // ASSIM QUE A PAGINA CARREGA 
   
   //window.addEventListener('DOMContentLoaded', selectInitial());


   window.addEventListener('DOMContentLoaded', makeProfile(), makeCardInfo(), showContactList ());


   
    // FUNÇÃO PARA SALVAR DADOS DIRETO NA RAIZ DO FIREBASE
    function updateDataUser() {
        var user = firebase.auth().currentUser;
        if (user) {
            user.updateProfile({
                displayName: txtNome.value,                
            });
        };
    };


    // ROTINA BOTÃO SALVAR DE INFORMAÇÕES DO USUARIO
    btnSaveUserInfo.addEventListener('click', function () {

        updateDataUser();

        var user = firebase.auth().currentUser;
        console.log(user);
        if (user != null) {

            console.log('USER LOGGED');

            var dataUser = {
                urlProfile: 'https://join-scholar.firebaseapp.com/'+user.uid,
                userId: user.uid,
                userName: txtNome.value,
                userEmail: user.email,
                userSite: txtSite.value,
                userPhoto: user.photoURL,
                userUniversity: txtUniversidade.value,
                userCourse: txtCurso.value,
                userBio: txtBio.value
            }

            firebase.database().ref().child('users/' + user.uid).set(dataUser);

            //makeProfile();

            dialogUserInfo.close();

        } else { console.log('USER NOT LOGGED'); }
    });




    // // FUNÇÃO PARA MONTAR O PERFIL DO USUARIO COM AS REFERENCIAS NO FIREBASE
     function makeProfile() {
         firebase.auth().onAuthStateChanged(firebaseUser => {
             var user = firebase.auth().currentUser.uid;

             console.log(user);

             firebase.database().ref().child('users/' + user).on('value', function (snap) {
                 var userInfo = (snap.val());

                 console.log(userInfo);


                 imgProfile.innerHTML='';
                 var img = document.createElement('img');
                 img.src = snap.val().userPhoto;
                 img.innerHTML = snap.val().userPhoto;
                 img.id = snap.key;
                 imgProfile.appendChild(img);

                 userInfoList.innerHTML = '';               
                 var h4 = document.createElement('h4');
                 var p = document.createElement('p');
                 var pBio = document.createElement('p');
                 var a = document.createElement('a');
                 var pMail = document.createElement('p');
                 var hr = document.createElement('hr')                 
                 h4.innerHTML = snap.val().userName;
                 h4.id = snap.key;
                 p.innerHTML = snap.val().userCourse + " - " + snap.val().userUniversity;
                 p.id = snap.key;
                 pBio.innerHTML = snap.val().userBio;
                 pBio.id = snap.key;
                 a.innerHTML = snap.val().userSite;
                 a.href = snap.val().txtSite;
                 a.id = snap.key;
                 pMail.innerHTML = snap.val().userEmail;
                 pMail.id = snap.key;                 
                 userInfoList.appendChild(h4);
                 userInfoList.appendChild(p);
                 userInfoList.appendChild(pBio);
                 userInfoList.appendChild(a);
                 userInfoList.appendChild(pMail);
                 userInfoList.appendChild(hr);

             })

         });
     };


    //CRIANDO REFERENCIA NO FIREBASE PARA ORGANIZAÇÃO DO FEED
    var dbRefFeed = firebase.database().ref().child('feed');
    var dbRefListFeed = dbRefFeed.child('post');

    //ROTINA PARA MANTER FEED SINCRONIZADO
    // ADD FEED
    dbRefListFeed.on('child_added', snap => {

        var img = document.createElement('img');
        var li = document.createElement('li');
        var link = document.createElement('a');
        var p = document.createElement('p');
        var hr = document.createElement('hr')
        img.src = snap.val().userPhoto;
        img.innerHTML = snap.val().userPhoto;
        img.id = snap.key; 
               
        //link.href = 'http://127.0.0.1:5000/profile.html';
        //link.href = 'https://join-scholar.firebaseapp.com/'+userId+'.html';
        link.innerHTML = snap.val().userName;
        link.id = snap.key;        
        p.innerText = snap.val().userText;
        p.id = snap.key;             
        feedList.appendChild(img);
        feedList.appendChild(link);
        feedList.appendChild(p);
        feedList.appendChild(hr);

        link.addEventListener('click', function(){
            //profileId = snap.val().userId;
            console.log(profileId);
            localStorage.setItem('keyUser', snap.val().userId);
            localStorage.setItem('keyUserName', snap.val().userName);
            localStorage.setItem('keyUserPhoto', snap.val().userPhoto);
            //showProfile();
            //window.location.assign('http://127.0.0.1:5000/profile.html');
            window.location.assign('https://join-scholar.firebaseapp.com/profile.html');
        });

    });
    // ATUALIZANDO FEED
    dbRefListFeed.on('child_changed', snap => {
// TODO ATUALIZAR ESSES CAMPOS
        var imgChanged = document.getElementById(snap.key);
        imgChanged.innerHTML = snap.val();

        var liChanged = document.getElementById(snap.key);
        liChanged.innerHTML = snap.val();
        
        var linkChanged = document.getElementById(snap.key);
        linkChanged.innerHTML = snap.val();

        var pChanged = document.getElementById(snap.key);
        pChanged.innerHTML = snap.val();

    });
    // DELETANDO FEED
    dbRefListFeed.on('child_removed', snap => {
// TODO ATUALIZAR ESSES CAMPOS        
        var imgChanged = document.getElementById(snap.key);
        imgChanged.remove();

        var liChanged = document.getElementById(snap.key);
        liChanged.remove();
        
        var linkChanged = document.getElementById(snap.key);
        linkChanged.remove();

        var pChanged = document.getElementById(snap.key);
        pChanged.remove();
    });



    // BOTÃO POSTAR NO FEED
    postButton.addEventListener('click', function () {

        var user = firebase.auth().currentUser;

        if (user != null) {

            var data = {
                userId: user.uid,
                userPhoto: user.photoURL,                
                userName: user.displayName,
                userText: textFeed.value
            }

            firebase.database().ref().child('feed/post').push(data);

        } else {
            console.log('errrooooo!');
        };

        dialogFeed.close();
        console.log('salvo no database');
    });




 
 
    var storageRef = firebase.storage().ref();
    var storageFilesRef = storageRef.child('profiles/');
 
    function sendImage(fileInputImage) {
     
          var file = fileInputImage.files[0];
           //Create the file metadata
          var metadata = {
            contentType: 'image/jpg'
          };
           //Upload file and metadata to the object 
          var uploadTask = storageFilesRef.child('images/' + file.name).put(file, metadata);
           //Listen for state changes, errors, and completion of the upload.
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
               //Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING:  //or 'running'
                  console.log('Upload is running');
                  break;
              }
            }, function (error) {
               //A full list of error codes is available at
               https:firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                   //User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                   //User canceled the upload
                  break;
                //...
                case 'storage/unknown':
                   //Unknown error occurred, inspect error.serverResponse
                  break;
              }
            }, function () {
               //Upload completed successfully, now we can get the download URL
              var downloadURL = uploadTask.snapshot.downloadURL;
              console.log(downloadURL);

              storageFilesRef.child('images/' + file.name).getDownloadURL().then(function(url){
                
                             var user = firebase.auth().currentUser;
                             console.log(user);
                
                             if (user) {
                                 user.updateProfile({                    
                                     photoURL: url
                                 });
                                 console.log(user.photoURL);
                             };
                
                           });                            
            });
 
//TODO: MUDA FOTO DO PERFIL INDEPENDENTE

           makeProfile();
           makeCardInfo();
            dialogUpdatePhoto.close();
        };






firebase.auth().onAuthStateChanged(firebaseUser => {
   var user = firebase.auth().currentUser;
        if(!user){        

var dbRefUsers = firebase.database().ref().child('users'+user.uid);
    // var dbRefListFeed = dbRefFeed.child('post');


// USERS ATUALIZADOS
dbRefUsers.on('child_added', snap => {

    var img = document.createElement('img');
    var h4 = document.createElement('h4');
    var p = document.createElement('p');
    var a = document.createElement('a');
    var pBio = document.createElement('p');
    var pMail = document.createElement('p');
    var hr = document.createElement('hr')
    img.src = snap.val().userPhoto;
    img.innerHTML = snap.val().userPhoto;
    img.id = snap.key;
    h4.innerHTML = snap.val().userName;
    h4.id = snap.key;
    p.innerHTML = snap.val().userCourse + " - " + snap.val().userUniversity;
    p.id = snap.key;
    pBio.innerHTML = snap.val().userBio;
    pBio.id = snap.key;
    a.innerHTML = snap.val().userSite;
    a.href = snap.val().txtSite;
    a.id = snap.key;
    pMail.innerHTML = snap.val().userEmail;
    pMail.id = snap.key;
    imgProfile.appendChild(img);
    userInfoList.appendChild(h4);
    userInfoList.appendChild(p);
    userInfoList.appendChild(pBio);
    userInfoList.appendChild(pMail);
    userInfoList.appendChild(hr);

});
// ATUALIZANDO FEED
dbRefUsers.on('child_changed', snap => {
    // TODO ATUALIZAR ESSES CAMPOS
    var imgChanged = document.getElementById(snap.key);
    imgChanged.innerHTML = snap.val();

    var h4Changed = document.getElementById(snap.key);
    h4Changed.innerHTML = snap.val();

    var pChanged = document.getElementById(snap.key);
    pChanged.innerHTML = snap.val();

    var pBioChanged = document.getElementById(snap.key);
    pBioChanged.innerHTML = snap.val();

    var pMailChanged = document.getElementById(snap.key);
    pMailChanged.innerHTML = snap.val();


});
// DELETANDO FEED
dbRefUsers.on('child_removed', snap => {
    // TODO ATUALIZAR ESSES CAMPOS 

    var imgChanged = document.getElementById(snap.key);
    imgChanged.remove()

    var h4Changed = document.getElementById(snap.key);
    h4Changed.remove()

    var pChanged = document.getElementById(snap.key);
    pChanged.remove()

    var pBioChanged = document.getElementById(snap.key);
    pBioChanged.remove()

    var pMailChanged = document.getElementById(snap.key);
    pMailChanged.remove()

});


}

});

var projTitle = document.getElementById('projTitle');
var projDescrip = document.getElementById('projDescrip');
var btnViewProj = document.getElementById('btnViewProj');



function makeCardInfo() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
        var user = firebase.auth().currentUser.uid;
  
        console.log(user);
  
        firebase.database().ref().child('files/' + user).on('value', function (snap) {
            var userInfo = (snap.val());
  
            console.log(userInfo);
  
  //var img = document.createElement('img');
  //var li = document.createElement('li');
  var h6 = document.createElement('h6');
  var p = document.createElement('p')
  var link = document.createElement('a');
  // img.src = snap.val().userPhoto;
  // img.innerHTML = snap.val().userPhoto;
  // img.id = snap.key;        
  link.href = snap.val().urlFile;
  //link.href = 'https://join-scholar.firebaseapp.com/profile.html';
  link.innerHTML = snap.val().botao;
  link.id = snap.key;
  h6.innerHTML = snap.val().fileName;
  h6.id = snap.key;        
  p.innerText = snap.val().descriFile;
  p.id = snap.key;             
  //feedList.appendChild(img);
  projTitle.appendChild(h6);
  projDescrip.appendChild(p);
  btnViewProj.appendChild(link);         
  
        })  
    });
  };








  function showContactList (){
    
        firebase.auth().onAuthStateChanged(firebaseUser => {
            var user = firebase.auth().currentUser.uid;
              
                    // firebase.database().ref().child('users/' + userCode).on('value', function (snap) {
                    //     var userInfo = (snap.val());
                
                       
                
                        var dbRefUser = firebase.database().ref().child('users/' + user);
                        var dbRefContact = dbRefUser.child('/contact/');
                        // dbRefContact.set(dataContact);
                        
                        dbRefContact.on('child_added', snap => {
                          
                              var img = document.createElement('img');
                              
                              var link = document.createElement('a');
                              
                              var hr = document.createElement('hr')
                              img.src = snap.val().userPhoto;
                              img.innerHTML = snap.val().userPhoto;
                              img.id = snap.key;                                      
                             
                              link.innerHTML = snap.val().userName;
                              link.id = snap.key;        
                                          
                              contactList.appendChild(img);
                              contactList.appendChild(link);
                              
                              contactList.appendChild(hr);
                          
                              link.addEventListener('click', function(){
                                  //profileId = snap.val().userId;
                                  console.log(profileId);
                                  localStorage.setItem('keyUser', snap.val().userId);
                                  localStorage.setItem('keyUserPhoto', snap.val().userPhoto);
                                  //showProfile();
                                  //window.location.assign('http://127.0.0.1:5000/profile.html');
                                  window.location.assign('https://join-scholar.firebaseapp.com/profile.html');
                              });
                          

                    })
                
            });
  
        
    }
        
















})();




