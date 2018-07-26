var appPageHandlers = require('./handlers/appPage');

module.exports = function (app) {
	app.get('/search', appPageHandlers.search);
	app.get('/', appPageHandlers.render);
};
