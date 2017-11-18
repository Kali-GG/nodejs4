module.exports = {
  navigationElements: function(path) {
    let navigationElements = [
      {display: 'Overview', href: '/', icon: 'fa fa-users fa-fw'},
      {display: '01-Phaser-Tutorial', href: '/01-Phaser-Tutorial', icon: 'fa fa-paint-brush fa-fw'},
      {display: '02-Phaser-box2d', href: '/02-Phaser-box2d', icon: 'fa fa-bullseye fa-fw'},
      {display: '03-Phaser-motionPaths', href: '/03-Phaser-motionPaths', icon: 'fa fa-diamond fa-fw'},
      {display: '04-Phaser-Maze', href: '/04-Phaser-Maze', icon: 'fa fa-random fa-fw'},
      {display: '04a-P5-Maze', href: '/04a-P5-Maze', icon: 'fa fa-random fa-fw'},
      {display: 'General', href: '/something', icon: 'fa fa-bank fa-fw'},
      {display: 'History', href: '/something', icon: 'fa fa-history fa-fw'},
      {display: 'Settings', href: '/something', icon: 'fa fa-cog fa-fw'}
    ];
    for (let i = 0; i < navigationElements.length; i++) {
      if (navigationElements[i].href == path) {
        navigationElements[i].class = 'w3-bar-item w3-button w3-padding w3-blue';
      }
      else {
        navigationElements[i].class = 'w3-bar-item w3-button w3-padding';
      }
    }
    return navigationElements;
  }
};
