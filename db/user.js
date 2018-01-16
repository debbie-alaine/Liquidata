var Passwords = require('./database').Passwords;

module.exports.findByUsername = function(username, password, done) {
    process.nextTick(function() {
        Passwords.findOne({
            where:
                {
                    username: username,
                    password: password
                },
            attributes: ['userid', 'username', 'password', 'email']
        }).then(function (user) {
            if (!user) {
                console.log("no user found");
                return done(null, false, {message: "Incorrect username or password"})
            } else {
                console.log("user found");
                return done(null, {
                    username: user.getDataValue('username'),
                    password: user.getDataValue('password'),
                    email: user.getDataValue('email'),
                    userid: user.getDataValue('userid')
                });
            }
        });
    });
};
