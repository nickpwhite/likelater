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

function postUser(user, callback) {
    $.ajax('/users', {
        data: user,
        dataType: 'json',
        method: 'POST',
        success: (response) => {
            callback(null, response);
        },
        error: (error) => {
            callback(error, null);
        }
    });
};

function putUser(user, callback) {
    const encoded_email = encodeURIComponent(user.email);
    $.ajax(`/users/${encoded_email}`, {
        data: user,
        dataType: 'json',
        method: 'PUT',
        success: (response) => {
            callback(null, response);
        },
        error: (error) => {
            callback(error, null);
        }
    });
};

function addUser() {
    var handle = $('#handle')[0].value;
    var email = $('#email')[0].value;

    getUser(email, function (err, user) {
        if (err) {
            throw err;
        }

        console.log(user);
        if (user && user.handles.includes(handle)) {
            $('#submitResultMessage').text(email + " is already receiving email alerts for @" + handle);
        } else if (user) {
            user.handles.push(handle);
            putUser(user, (response) => {
                $('#submitResultMessage').text("Email alerts successfully enabled");
            });
        } else {
            user = {
                email: email,
                handles: [handle]
            }
            postUser(user, (response) => {
                $('#submitResultMessage').text("Email alerts successfully enabled");
            });
        }
        $('#submitResultMessage').show();
    });
};

function changeNav(event) {
    $('nav').find('.active').removeClass('active');
    $(event.target).parent().addClass('active');
    $('nav').find('.in').removeClass('in');
};
