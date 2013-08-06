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

function getAlertCount () {
    var alert_count = 0;
    var rooms = document.getElementById('tabs').getElementsByTagName('li');
    for (var i = 0; i < rooms.length; i++){
        if(rooms[i].className == 'alert') {
            alert_count++;
        }
    }

    if (alert_count > 0) {
        Unity.Launcher.setCount(Number(alert_count));
    } else {
        Unity.Launcher.clearCount();
    }

    return true;
}

function setupHipChat() {
    if (!isCorrectPage()) {
        return;
    }

    setInterval(wrapCallback(getAlertCount), 2000);
    getAlertCount();

    return true;
}

if (isCorrectPage()) {
    Unity.init({
        name: 'HipChat',
        iconUrl: 'icon://unity-webapps-hipchat',
        homepage: 'https://www.hipchat.com/chat',
        onInit: wrapCallback(setupHipChat)
    });
}
