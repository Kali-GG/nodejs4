/*const testFolder = './views/cards/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
})*/



module.exports = {
  getSpecificCard: function (cardName, session) {
    console.log('preparing card ' + cardName);
    let loginCard = require('./views/cards/'+cardName+'.js');
    let card = loginCard.getHtmlMarkup(session);
    return card;
  },
  getAllCards: function () {

  }
};
