var Robot = require('../models/robotModel.js');
var routes = {};

routes.show = Robot.find({}, function(err, robots){
  	console.log(robots);
});


module.exports = routes;