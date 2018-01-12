exports.findById = function(id, cb) {
    process.nextTick(function() {
        var find_by_id_query = 'SELECT *\n' +
            'FROM  `passwords` \n' +
            'WHERE userid = ' + id + '\n' +
            'LIMIT 0 , 1';
        record = con.query(find_by_id_query, function (err, result) {
            if (err) {
                console.log("Error in 'Find by UserID' Query.");
                throw err;
            }
            else {
                console.log("Result: " + JSON.stringify(result));
            }
        });
        if (record.length > 0) {
            cb(null, record[0]);
        } else {
            cb(new Error('UserID ' + id + ' does not exist'));
        }
    });
};

exports.findByUsername = function(username, cb) {
    process.nextTick(function() {
        var find_by_id_username_query = 'SELECT *\n' +
            'FROM  `passwords` \n' +
            'WHERE username = ' + username + '\n' +
            'LIMIT 0 , 30';
        record = con.query(find_by_id_username_query, function (err, result) {
            if (err) {
                console.log("Error in 'Find By Username' Query.");
                throw err;
            }
            else {
                console.log("Result: " + JSON.stringify(result));
            }
        });
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.username === username) {
                return cb(null, record);
            }
        }
        if (record.length > 0) {
            cb(null, record[0]);
        } else {
            cb(new Error('Username ' + username + ' does not exist'));
        }
    });
};
