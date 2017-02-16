'use strict';

function getUsers(callback) {
    $.ajax('/users', {
        dataType: 'json',
        method: 'GET',
        success: (response) => {
            callback(response);
        },
        error: (response) => {
            callback(response);
        }
    });
};

function postUser(email_address, screen_name, callback) {
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

function addUser() {
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
