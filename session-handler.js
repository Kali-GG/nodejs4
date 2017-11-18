/*let _ = require('lodash');
let dbHandler = require('./db-handler.js');
let sessions = {}; //dbHandler.sessionData.find();

console.log('damn this code runs');

module.exports = {
  getAllSessions: function() {
    return sessions;
  },
  getSessionByHash: function (hash) {
    let returnObj = _.each(sessions, function(session, hash) {
      if(session.sessionKey == hash) {
        console.log('session found');
        console.log(session);
        return session;
      }
      return false;
    });
    return returnObj;
  },
  getSessionByUser: function (user) {
    console.log(sessions);
    _.each(sessions, function(session, key) {
      if(session.accountName == user ) {
        return session;
      }
      return null;
    });
  },
  createSession: function (user, id) {
    try {
      console.log('createSession, sessions found: ')
      console.log(sessions);
      _.each(sessions, function(session, key) {
        console.log('each loop, current session: ' + session);
        if(session.accountName == user ) {
          session = undefined;
        }
      });

      let newSession = {
        sessionKey: generateSessionKey(user),
        accountName: user,
        expirationDate: null,
        ioKey: id
      };

      sessions[newSession.sessionKey] = newSession;

      return newSession;
    }
    catch (err) {
      console.log(err);
    }
  },
  deleteSession: function (user) {

  },
  consoleLogSessions: function () {
    console.log(sessions);
  }
};


function generateSessionKey(user) {
  let newKey = user + Math.random();
  return newKey;
}

///
/// bs
///

let sessionObj = {
  sessionKey: 'siufhusdhfusdfu',
  accountName: 'seppl',
  expirationDate: null
}

let sessioncookie = {
  sessionKey: ''
};
