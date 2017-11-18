
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nodejsdb', {
  useMongoClient: true,
  /* other options */
});
let Schema = mongoose.Schema;

let userDataSchema = new Schema({
  accountName: {type: String, required: true},
  email: String,
  password: String,
  avatar: String,
  userGroups: []
}, {collection: 'users'});
let userData = mongoose.model('userData', userDataSchema);

let sessionSchema = new Schema({
  sessionKey: {type: String, required: true},
  expirationDate: Date,
  accountName: String,
  ioKey: String
}, {collection: 'sessions'});
let sessionData = mongoose.model('sessionData', sessionSchema);

module.exports = {
  loginUser: function (inputData) { // expected: inputData.accountName, inputData.password
    return new Promise(function (resolve, reject) {
      userData.findOne({accountName: inputData.accountName}, function(err, accountData) {
        if (err) {
          reject(err);
          return;
        }
        if(accountData != null) {
          if(accountData.password == inputData.password) {
            resolve(accountData);
            return;
          }
          else {
            reject('wrong password');
            return;
          }
        }
        else {
          reject('user not found');
          return;
        }
      });
    });
  },
  getUserByAccountName: function (accountName) {

  },
  createNewUser: function (inputData) { //expected: inputData.accountName, inputData.password
    let newSession = {
      accountName: inputData.accountName,
      password: inputData.password
    }

    let data = new sessionSchema(item);
    data.save();
  },
  updateUser: function (accountName, data) {

  },
  getSessionByAccountName: function (accountName) {
    return new Promise(function (resolve, reject) {
      sessionData.findOne({accountName: accountName}, function(err, sessionData) {
        if (err) {
          reject(err);
          return;
        }
        if(sessionData != null) {
          resolve(sessionData);
          return;
        }
        else {
          reject({accountName: accountName, error: 'session not found'});
          return;
        }
      });
    });
  },
  getSessionByHash: function (inputData) {//expected: inputData.id
    return new Promise(function (resolve, reject) {
      sessionData.findOne({sessionKey: inputData.id}, function(err, sessionData) {
        if (err) {
          reject(err);
          return;
        }
        if(sessionData != null) {
          resolve(sessionData);
          return;
        }
        else {
          reject('session not found');
          return;
        }
      });
    });
  },
  createSessionByAccountName: function (inputData) { //expected: inputData.accountName, inputData.id
    return new Promise(function (resolve, reject) {
      let newSession = new sessionData({
        sessionKey: generateSessionKey(inputData.accountName),
        accountName: inputData.accountName,
        expirationDate: null,
        ioKey: inputData.id
      });
      newSession.save( function(err, sessionData) {
        if (err) {
          reject(err);
          return;
        }
        else {
          resolve(sessionData);
          return;
        }
      });
    });
  }
};


function generateSessionKey(user) {
  return user + Math.random();
}
