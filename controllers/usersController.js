'use strict';

module.exports = {

    getUsers: function(req, res) {
        console.log('Starting find users')
        res.json({"hola": {
            "nombre": "find users"
        }})
        
    },

    getUserById: function(req, res) {
        console.log(`Starting find user with Id: ${req.params.id}`)
        res.json({"hola": {
            "nombre": "find user by id"
        }})
    }

};
