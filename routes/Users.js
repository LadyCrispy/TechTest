'use strict';
module.exports = function(app) {

    const usersCtrl = require('../controllers/usersController.js');

    app.route('/users').get(usersCtrl.getUsers);
    app.route('/users/:id').get(usersCtrl.getUserById);

};