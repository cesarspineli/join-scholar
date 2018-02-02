(function(){
    'use strict'

var profileInfoList = document.getElementById('profileInfoList');
var imgInfoProfile = document.getElementById('imgInfoProfile');
var iconAdd = document.getElementById('iconAdd');



    var profileId = localStorage.getItem('keyUser');
    var profileName = localStorage.getItem('keyUserName');
    var profilePhoto = localStorage.getItem('keyUserPhoto');


    window.addEventListener('DOMContentLoaded', showProfile(), showCardInfo());

    iconAdd.addEventListener('click', function(){

        firebase.auth().onAuthStateChanged(firebaseUser => {
            var user = firebase.auth().currentUser.uid;

            console.log(user);

            var dataContact = {
                userId: profileId,
                userPhoto: profilePhoto,
                userName: profileName
            }
               
            var dbRefUser = firebase.database().ref().child('users/' + user);
            var dbRefContact = dbRefUser.child('/contact/' +profileId );
            dbRefContact.set(dataContact);
            

        })

        });





    function showProfile() {       
    console.log(profileId);
    //     console.log(profileId);
    //     //   firebase.auth().onAuthStateChanged(firebaseUser => {
        
                
        
        firebase.database().ref().child('users/' + profileId).on('value', function (snap) {
            var userInfo = (snap.val());
    
            console.log(userInfo);
    
    
            imgInfoProfile.innerHTML='';
            var img = document.createElement('img');
            img.src = snap.val().userPhoto;
            img.innerHTML = snap.val().userPhoto;
            img.id = snap.key;
            imgInfoProfile.appendChild(img);
    
            profileInfoList.innerHTML = '';               
            var h4 = document.createElement('h4');
            var p = document.createElement('p');
            var pBio = document.createElement('p');
            var pMail = document.createElement('p');
            var hr = document.createElement('hr')                 
            h4.innerHTML = snap.val().userName;
            h4.id = snap.key;
            p.innerHTML = snap.val().userCourse + " - " + snap.val().userUniversity;
            p.id = snap.key;
            pBio.innerHTML = snap.val().userBio;
            pBio.id = snap.key;
            pMail.innerHTML = snap.val().userEmail;
            pMail.id = snap.key;                 
            profileInfoList.appendChild(h4);
            profileInfoList.appendChild(p);
            profileInfoList.appendChild(pBio);
            profileInfoList.appendChild(pMail);
            profileInfoList.appendChild(hr);
    
        })
    
       };


       function showCardInfo() {
     
      
            firebase.database().ref().child('files/' + profileId).on('value', function (snap) {
                var userInfo = (snap.val());
      
               
      
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
        };
        

        iconAdd.addEventListener('click', function(){
            document.getElementById('iconAdd').style.color ='rgb(43, 108, 194)';
        });

    
})();