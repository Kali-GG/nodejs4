module.exports = {
  getHtmlMarkup: function(session) {
    let htmlMarkup = '';
    if (session.accountName) {
      htmlMarkup += '<div id="card-login-div">';
      htmlMarkup += '<p>Welcome back, ' + session.accountName + '!';
      htmlMarkup += '</div>';
    }
    else {
      htmlMarkup += '<div id="card-login-div">';
      htmlMarkup += 'Account Name: <br />';
      htmlMarkup += '<input type="text" id="field-accountName"><br />';
      htmlMarkup += 'Password: <br />';
      htmlMarkup += '<input type="password" id="field-password"><br>';
      htmlMarkup += '<button id="card-login-button" onClick="loginAttempt()"> Login </button>';
      htmlMarkup += '</div>';
    }
    return htmlMarkup;
  }
};
