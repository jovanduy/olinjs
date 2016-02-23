var path = require('path');
var routes = {};

routes.home = function (req, res) {
    res.sendFile('main.html', { root: path.join(__dirname, '../public/views/layouts') });
    // res.sendfile('./views/layouts/main.html');
}

module.exports = routes;