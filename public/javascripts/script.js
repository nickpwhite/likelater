getUsers = function (callback) {
    $.ajax('/users', {
        dataType: 'json',
        method: 'GET',
        success: function (response) {
            callback(response);
        }
    });
}

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
}

addUser = function () {
    var handle = $('#handle')[0].value;
    var email = $('#email')[0].value;
    var exists = false;

    getUsers(function (users) {
        users.forEach(function (user) {
            if (user.screen_name === handle && user.email_address === email) {
                exists = true;
            }
        });

        if (exists) {
            $('#submitResultMessage').text(email + " is already receiving email alerts for @" + handle);
        } else {
            postUser(email, handle, function (response) {
                $('#submitResultMessage').text("Email alerts successfully enabled");
            });
        }
        $('#submitResultMessage').show();
    });
}
