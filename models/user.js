
var sequelize = require('../boot/db.js');
var Sequelize = require('sequelize');

// model
var user = sequelize.define('User', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    }
});

// syncing model with database, creating table and a row
// force: true will drop the table if it already exists
user.sync({force: false}).then(function () {
    // Table created
    return user;
});

module.exports = user;