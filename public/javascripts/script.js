'use strict';

const pg = require('pg');

getUsers = function (callback) {
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query('SELECT * from users', (err, result) => {
            done(); // releases the client back to the pool
            
            if (err) {
                console.error(err);
                return callback(err);
            }
            return callback(null, result);
        });
    });
};

postUser = function (email_address, screen_name, callback) {
    $.ajax('/users', {
        data: {
            email_address: email_address,
            screen_name: screen_name
        },
        dataType: 'json',
        method: 'POST',
        success: function (response) {
            callback(response);
        },
        error: function (response) {
            callback(response);
        }
    });
};

addUser = function () {
    var handle = $('#handle')[0].value;
    var email = $('#email')[0].value;
    var exists = false;

    getUsers(function (err, users) {
        if (err) {
            throw err;
        }
        console.log(users);
        //users.forEach(function (user) {
            //if (user.screen_name === handle && user.email_address === email) {
                //exists = true;
            //}
        //});

        //if (exists) {
            //$('#submitResultMessage').text(email + " is already receiving email alerts for @" + handle);
        //} else {
            //postUser(email, handle, function (response) {
                //$('#submitResultMessage').text("Email alerts successfully enabled");
            //});
        //}
        //$('#submitResultMessage').show();
    //});
    });
};
