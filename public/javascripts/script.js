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

        let handle_index = -1;

        for (let i = 0; i < user.handles.length; i++) {
            if (user.handles[i].handle === handle) {
                handle_index = i;
                break;
            }
        }

        if (user && handle_index >= 0 && user.handles[handle_index].active) {
            $('#submitResultMessage').text(email + " is already receiving email alerts for @" + handle);
        } else if (user && handle_index >= 0) {
            user.handles[handle_index].active = true;
            putUser(user, (response) => {
                $('#submitResultMessage').text("Email alerts successfully enabled");
            });
        } else if (user) {
            user.handles.push({
                active: true,
                handle: handle
            });
            putUser(user, (response) => {
                $('#submitResultMessage').text("Email alerts successfully enabled");
            });
        } else {
            user = {
                email: email,
                handles: [{
                    active: true,
                    handle: handle
                }]
            };
            postUser(user, (response) => {
                $('#submitResultMessage').text("Email alerts successfully enabled");
            });
        }
        $('#submitResultMessage').show();
    });
};

function deactivateUser() {
    var handle = $('#unenroll_handle')[0].value;
    var email = $('#unenroll_email')[0].value;

    var data = {
        email: email,
        handle: handle
    };

    $.ajax('/unsubscribe', {
        data: data,
        //dataType: 'json',
        method: 'POST',
        success: (response) => {
            $('#submitResultMessage').text("Email alerts successfully disabled, we're sorry to see you go");
        },
        error: (error) => {
            if (error === 'User not found' || error === 'Handle not found') $('#submitResultMessage').text(error);
            else $('#submitResultMessage').text("There was a problem enabling alerts, please contact us");
        }
    });
    $('#submitResultMessage').show();
};
