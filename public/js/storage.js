(function () {
  'use strict'

  var fileInput = document.getElementById('fileInput');
  var btnFileUpload = document.getElementById('btnFileUpload');

  var txtFileName = document.getElementById('txtFileName');  
  var txtFileDescri = document.getElementById("fileDescrip");
  
 

  btnFileUpload.addEventListener('click', function () {
    sendFile(fileInput);
  });

 

  var storageRef = firebase.storage().ref();
  var storageFilesRef = storageRef.child('profiles/');

  function sendFile(fileInput) {

    var file = fileInput.files[0];
    // Create the file metadata
    var metadata = {
      contentType: 'application/pdf'
    };
    // Upload file and metadata to the object 
    var uploadTask = storageFilesRef.child('files/' + file.name).put(file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          //...
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);

        
        storageFilesRef.child('files/' + file.name).getDownloadURL().then(function(url){
          
                       var user = firebase.auth().currentUser;
                       console.log(user);
          
                       if (user) {
                        var dataPortfolio = {
                          botao:'Ver Projeto',
                          userId: user.uid,
                          urlFile: url,
                          fileName: txtFileName.value,
                          descriFile: txtFileDescri.value
                        }
                       };                                         
                    
        
                    firebase.database().ref().child('files/' +user.uid).set(dataPortfolio);

          
                     });                            
      });

      
      dialogUpload.close();
  };






})();



