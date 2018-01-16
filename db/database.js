var config = require('./../config'),
    Sequelize = require('sequelize');

// initialize database connection
var sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: config.dialect,
        operatorsAliases: false
    }
);

var Passwords = sequelize.define('passwords', {
    userid: Sequelize.INTEGER,
    username: Sequelize.TEXT,
    password: Sequelize.TEXT,
    email: Sequelize.TEXT
});

// export connection
//module.exports.sequelize = sequelize;
exports.Passwords = Passwords;
