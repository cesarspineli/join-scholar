//  var fileInputImage = document.getElementById('fileInputImage');
//    var btnUpdatePhoto = document.getElementById('btnUpdatePhoto');

//    btnUpdatePhoto.addEventListener('click', function () {
//      sendImage(fileInputImage);

//    });


//    function sendImage(fileInputImage) {

//          var file = fileInputImage.files[0];
//           //Create the file metadata
//          var metadata = {
//            contentType: 'image/jpg'
//          };
//           //Upload file and metadata to the object
//          var uploadTask = storageFilesRef.child('images/' + file.name).put(file, metadata);
//           //Listen for state changes, errors, and completion of the upload.
//          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//            function (snapshot) {
//               //Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//              console.log('Upload is ' + progress + '% done');
//              switch (snapshot.state) {
//                case firebase.storage.TaskState.PAUSED: // or 'paused'
//                  console.log('Upload is paused');
//                  break;
//                case firebase.storage.TaskState.RUNNING:  //or 'running'
//                  console.log('Upload is running');
//                  break;
//              }
//            }, function (error) {
//               //A full list of error codes is available at
//               https:firebase.google.com/docs/storage/web/handle-errors
//              switch (error.code) {
//                case 'storage/unauthorized':
//                   //User doesn't have permission to access the object
//                  break;
//                case 'storage/canceled':
//                   //User canceled the upload
//                  break;
//                //...
//                case 'storage/unknown':
//                   //Unknown error occurred, inspect error.serverResponse
//                  break;
//              }
//            }, function () {
//               //Upload completed successfully, now we can get the download URL
//              var downloadURL = uploadTask.snapshot.downloadURL;
//              console.log(downloadURL);
//            });

//            storageFilesRef.child('images/' + file.name).getDownloadURL().then(function(url){

//              var user = firebase.auth().currentUser;
//              console.log(user);

//              if (user != null) {
//                  user.updateProfile({
//                      photoURL: url
//                  });
//              };

//            });


//            dialogUpdatePhoto.close();
//        };




// var projTitle = document.getElementById('projTitle');
// var projDescrip = document.getElementById('projDescrip');
// var btnViewProj = document.getElementById('btnViewProj');


// var dbRefCard = firebase.database().ref().child('files');
// var dbRefCardInfo = dbRefCard.child('portifolio');







// function makeCardInfo() {
//   firebase.auth().onAuthStateChanged(firebaseUser => {
//       var user = firebase.auth().currentUser.uid;

//       console.log(user);

//       firebase.database().ref().child('files/portfolio/' + user).on('value', function (snap) {
//           var userInfo = (snap.val());

//           console.log(userInfo);

// //var img = document.createElement('img');
// //var li = document.createElement('li');
// var h4 = document.createElement('h4');
// var p = document.createElement('p')
// var link = document.createElement('a');
// // img.src = snap.val().userPhoto;
// // img.innerHTML = snap.val().userPhoto;
// // img.id = snap.key;
// link.href = urlFile;
// //link.href = 'https://join-scholar.firebaseapp.com/profile.html';
// link.innerHTML = snap.val('Ver Projeto');
// //link.id = snap.key;
// h4.innerHTML = snap.val().fileName;
// h4.id = snap.key;
// p.innerText = snap.val().descrFile;
// p.id = snap.key;
// //feedList.appendChild(img);
// projTitle.appendChild(h4);
// projDescrip.appendChild(p);
// btnViewProj.appendChild(link);

//       })

//   });
// };









// MOSTRAR O PERFIL DE OUTRO USUARIO


// var dbRefCard = firebase.database().ref().child('files');
// var dbRefCardInfo = dbRefCard.child('portifolio');





// window.addEventListener('DOMContentLoaded', showProfile());



      // for (x = 1; x < 28; x++) {
      //   profileId += url[x];
      //        }

      //        console.log(profileId);

      // console.log(profileId);


// function showProfile() {

//   firebase.auth().onAuthStateChanged(firebaseUser => {

//     var profileId; //tem que receber o id do usuario que não currentUser


//       firebase.database().ref().child('users/').equalTo(profileId).on('value', function (snap) {
//           var userInfo = (snap.val());

//           console.log(profileId);





//       })

//   });
// };

var dbRefUser = firebase.database().ref().child('users/' + user);
var dbRefContact = dbRefUser.child('/contact/' +profileId );
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
      contactList.appendChild(p);
      contactList.appendChild(hr);
  
      link.addEventListener('click', function(){
          //profileId = snap.val().userId;
          console.log(profileId);
          localStorage.setItem('keyUser', snap.val().userId);
          localStorage.setItem('keyUserPhoto', snap.val().userPhoto);
          //showProfile();
          window.location.assign('http://127.0.0.1:5000/profile.html');
      });
  




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
        localStorage.setItem('keyUserPhoto', snap.val().userPhoto);
        //showProfile();
        window.location.assign('http://127.0.0.1:5000/profile.html');
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

