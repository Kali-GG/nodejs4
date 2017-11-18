let cardsHandler = require('../cards-handler.js');
let dbHandler = require('../db-handler.js');

module.exports = function (socket) {


  /**
   * Login
   * required input: targetdiv, accountName, password
   * returns: returnCode, infoText
   * searches users db for username & checks for correct password
   * on success: updates session
   */

  socket.on('loginAttempt', function (data) {
    console.log('user tried to log in: ' + JSON.stringify(data));
    dbHandler.loginUser(data).then(loginSuccessCallback, loginFailureCallback);
    function loginSuccessCallback(user) {
      console.log("Login succeeded with " + user);
      dbHandler.getSessionByAccountName(user.accountName).then(getSessionSuccessCallback, getSessionFailureCallback);
      //socket.emit('updateCard', {returnCode: 200, targetdiv: data.targetdiv, newHTML: cardsHandler.getSpecificCard('login', session)});
    }
    function loginFailureCallback(error) {
      console.log("Login failed with " + error);
    }
    function getSessionSuccessCallback(session) {
      console.log("Session search succeeded with " + session);
      socket.emit('updateSessionCookie', {sessionKey: session.sessionKey});
      socket.emit('redirect', {url: 'http://localhost:8000/'});
    }
    function getSessionFailureCallback(response) {
      console.log("session search failed with " + response.error);
      dbHandler.createSessionByAccountName({accountName: response.accountName, id: socket.id}).then(createSessionSuccessCallback, createSessionFailureCallback);
    }
    function createSessionSuccessCallback(session) {
      console.log("Session creation succeeded with " + session);
      socket.emit('updateSessionCookie', {sessionKey: session.sessionKey});
      socket.emit('redirect', {url: 'http://localhost:8000/'});
    }
    function createSessionFailureCallback(error) {
      console.log("Session creation  failed with " + error);
    }
  });

  /**
   * renderView
   * required input: targetdiv, requestedView, sessionid
   * returns: returnCode, targetdiv, newHTML
   * updated html structure for div and returns it
   */

 socket.on('renderView', function (data) {
   if(data.targetdiv && data.requestedView && data.sessionid) {
     console.log(data);
     dbHandler.getSessionByHash({id: data.sessionid}).then(getSessionSuccessCallback, getSessionFailureCallback);
     function getSessionSuccessCallback(session) {
       console.log("get Session succeeded with " + session);
     }
     function getSessionFailureCallback(error) {
       console.log("get Session failed with " + error);
     }


   }
   else {
     console.log('socket.on(renderView) ... corrupt data!');
     console.log(data);
   }
  });
  // 1. Check Session / user Rights
  // 2.


  /**
   * updateCard
   * required input: targetdiv
   * returns: returnCode, targetdiv, newHTML
   * updated html structure for div and returns it
   */
  socket.on('updateCard', function (data) {
    socket.emit('updateCard', {returnCode: 200, targetdiv: data.targetdiv, newHTML: '<div id="contentdiv-1"> Success! This card was updated <br> <button id="btn-test-1" onClick="updateCard("' + data.targetdiv + '"")"> Update this Card </button> </div>'});
  });


  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
};
