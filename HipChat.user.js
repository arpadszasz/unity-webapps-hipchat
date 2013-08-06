// ==UserScript==
// @name          hipchat-unity-integration
// @include       https://*.hipchat.com/*
// @version       @0.1@
// @author        Arpad Szasz
// @require       utils.js
// ==/UserScript==
 
window.Unity = external.getUnityObject(1.0);
 
function isCorrectPage() {
   var i, ids = ['roster', 'tab_lobby'];;
 
   for (i = 0; i < ids.length; i++) {
       if (!document.getElementById(ids[i])) {
           return false;
       }
   }
 
   return true;
}

function setupHipChat() {
}
 
if (isCorrectPage()) {
    Unity.init({
        name: 'HipChat',
        iconUrl: 'icon://unity-webapps-hipchat',
        homepage: 'https://www.hipchat.com/chat',
        onInit: wrapCallback(setupHipChat)
    });
}
