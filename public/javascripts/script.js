'use strict';

function getUsers(callback) {
    $.ajax('/users', {
        dataType: 'json',
        method: 'GET',
        success: (response) => {
            callback(null, response);
        },
        error: (error) => {
            callback(error, null);
        }
    });
};

function getUser(email, callback) {
    const encoded_email = encodeURIComponent(email);
    $.ajax(`/users?email=${encoded_email}`, {
        dataType: 'json',
        method: 'GET',
        success: (response) => {
            callback(null, response)
        },
        error: (error) => {
            callback(error, null);
        }
    });
};

function postUser(email, handle, callback) {
    $.ajax('/users', {
        data: {
            email: email,
            handle: handle
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

    getUser(email, function (err, user) {
        if (err) {
            throw err;
        }
        console.log(user[0]);
        if (user && user[0].handles.includes(handle)) {
            exists = true;
        }

        if (exists) {
            $('#submitResultMessage').text(email + " is already receiving email alerts for @" + handle);
        } else {
            postUser(email, handle, function (response) {
                $('#submitResultMessage').text("Email alerts successfully enabled");
            });
        }
        $('#submitResultMessage').show();
    });
};
