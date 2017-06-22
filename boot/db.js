
var Sequelize = require('sequelize');
var dbConfig = {url: "mysql://root@localhost:3306/authorize"};



// mysql connection
var sequelize = new Sequelize(dbConfig.url);

//test connection
sequelize
    .authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize;