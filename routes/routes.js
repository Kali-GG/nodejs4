var express = require('express');
var router = express.Router();

let _ = require('lodash');
let dbHandler = require('../db-handler.js');
let dataModule = require('../views/data.js');

router.get('*', function(req, res, next) {
  if(req.cookies) {
    if(req.cookies.sid) {
      dbHandler.getSessionByHash({id: req.cookies.sid}).then(getSessionSuccessCallback, getSessionFailureCallback);
      function getSessionSuccessCallback(session) {
        let data = gatherData(session, req.path);

        switch(req.path) {
          case '/':
            res.render('index', {title: 'Welcome', data: data, layout: 'authenticated'});
            break;
          case '/login':
            res.render('login', { title: 'Login', layout: 'unregistered'});
            break;
          case '/01-Phaser-Tutorial':
            res.render('projects/01-Phaser-Tutorial/01-Phaser-Tutorial', { title: '01-Phaser-Tutorial', data: data, layout: 'authenticated'});
            break;
          case '/02-Phaser-box2d':
            res.render('projects/02-Phaser-box2d/02-Phaser-box2d', { title: '02-Phaser-box2d', data: data, layout: 'authenticated'});
          break;
          case '/03-Phaser-motionPaths':
            res.render('projects/03-Phaser-motionPaths/03-Phaser-motionPaths', { title: '03-Phaser-motionPaths', data: data, layout: 'authenticated'});
          break;
          case '/04-Phaser-Maze':
            res.render('projects/04-Phaser-Maze/04-Phaser-Maze', { title: '04-Phaser-Maze', data: data, layout: 'authenticated'});
            break;
          case '/04a-P5-Maze':
            res.render('projects/04a-P5-Maze/04a-P5-Maze', { title: '04a-P5-Maze', data: data, layout: 'authenticated'});
          break;
          default:
            res.render('index', {title: 'Welcome', data: data, layout: 'authenticated'});
            break;
        }
      }
      function getSessionFailureCallback(response) {
        //console.log('session cookie invalid');
        res.render('login', { title: 'Login', layout: 'unregistered'});
      }
    }
    else {
      //console.log('no session cookie');
      res.render('login', { title: 'Login', layout: 'unregistered'});
    }
  }
  else {
    //console.log('no cookies');
    res.render('login', { title: 'Login', layout: 'unregistered'});
  }
});

function gatherData(session, path) {
  return {
    navigationElements: dataModule.navigationElements(path),
    user: {
      accountName: session.accountName
    }
  };
};



module.exports = router;
