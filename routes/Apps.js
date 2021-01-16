'use strict';
module.exports = function(app) {

    const appsCtrl = require('../controllers/appsController.js');

    app.route('/find').get(appsCtrl.getApps);
    app.route('/find/:category').get(appsCtrl.getAppsByCategory);

};