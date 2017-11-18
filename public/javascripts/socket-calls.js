
var socket = io.connect();




socket.on('updateCard', function (data) {
  console.log('update card recieved');
  if (data.returnCode == 200) {
    console.log('returncode ok');
    document.getElementById(data.targetdiv).innerHTML = data.newHTML;
  }
});

socket.on('updateSessionCookie', function (data) {
  console.log('update session cookie recieved');
  document.cookie = 'sid=' + data.sessionKey + '; path=/';
});

socket.on('redirect', function (data) {
  window.location = data.url;
});

function loginAttempt() {
  console.log('request sent');
  socket.emit('loginAttempt', {targetdiv: 'card-login-div',accountName: document.getElementById('field-accountName').value, password: document.getElementById('field-password').value});
};

function updateCard(targetdiv) {
  socket.emit('updateCard', {targetdiv: targetdiv});
}

function renderView(targetdiv, requestedView) {
  console.log('cookie ' + getCookie('sid'));
  socket.emit('renderView', {targetdiv: targetdiv, requestedView: requestedView, sessionid: getCookie('sid')});
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
