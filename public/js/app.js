(function () {
    
    
        // CAIXA DE DIALOGO PARA CAPTAR E ATULAIZAR INFORMAÇÕES DO USUARIO 
        var dialogUserInfo = document.querySelector('#dialogUserInfo');
        var showDialogUserInfo = document.querySelector('#showDialogUserInfo');
    
        if (!dialogUserInfo.showModal) {
            dialogPolyfill.registerDialog(dialogUserInfo);
        }
        showDialogUserInfo.addEventListener('click', function () {
            dialogUserInfo.showModal();
        });
        dialogUserInfo.querySelector('.close').addEventListener('click', function () {
            dialogUserInfo.close();
    
        });
    
    
        // var dialogUserInfo = document.querySelector('#dialogUserInfo');
        // // FUNÇÃO QUE TORNA A CAIXA DE DIALOGO AUTOMATICA
        // function dialogUserInfo() {
        //     //  CAIXA DE DIALOGO PARA CAPTAR E ATULAIZAR INFORMAÇÕES DO USUARIO MODO AUTOMATICO
         
        //     // var showDialogUserInfo = document.querySelector('#showDialogUserInfo');
    
        //     if (!dialogUserInfo.showModal) {
        //         dialogPolyfill.registerDialog(dialogUserInfo);
        //     }
        //     document.addEventListener('DOMContentLoaded', function () {
        //         dialogUserInfo.showModal();
        //     });
    
        //     dialogUserInfo.querySelector('.close').addEventListener('click', function () {
        //         dialogUserInfo.close();
    
        //     });
    
        // };
    
        //  CAIXA DE DIALOGO PARA ENVIAR COMENTARIO AO FEED
        var dialogFeed = document.querySelector('#dialogFeed');
        var showDialogButton = document.querySelector('#show-dialog-text');
    
        if (!dialogFeed.showModal) {
            dialogPolyfill.registerDialog(dialogFeed);
        }
        showDialogButton.addEventListener('click', function () {
            dialogFeed.showModal();
        });
        dialogFeed.querySelector('.close').addEventListener('click', function () {
            dialogFeed.close();
    
        });
    
    
        //  CAIXA DE DIALOGO PARA ENVIAR ARQUIVO DO PORTFOLIO AO CLOUD STORAGE
        var dialogUpload = document.querySelector('#dialogUpload');
        var showDialogUpload = document.querySelector('#showDialogUpload');
    
        if (!dialogUpload.showModal) {
            dialogPolyfill.registerDialog(dialogUpload);
        }
        showDialogUpload.addEventListener('click', function () {
            dialogUpload.showModal();
        });
        dialogUpload.querySelector('.close').addEventListener('click', function () {
            dialogUpload.close();
        });
    

// ENVIO DE FOTO PARA O STORAGE
        var dialogUpdatePhoto = document.querySelector('#dialogUpdatePhoto');
        var showDialogUpdatePhoto = document.querySelector('#showDialogUpdatePhoto');
        
        if(!dialogUpdatePhoto.showModal){
            dialogPolyfill.registerDialog(dialogUpdatePhoto);
        }
        showDialogUpdatePhoto.addEventListener('click', function (){
        dialogUpdatePhoto.showModal();
        });
        dialogUpdatePhoto.querySelector('.close').addEventListener('click', function(){
        dialogUpdatePhoto.close();
        });
    
    
    
    })();