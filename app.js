'use strict';

const async = require('async');
const body_parser = require('body-parser');
const express = require('express');
const pg = require('pg');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(body_parser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/users', (req, res) => {
    getUsers(req.query.email, (err, users) => {
        if (err) {
            console.error(err);
            return;
        }
        if (req.query.email && users[0]) {
            res.json(users[0]);
        } else if (req.query.email) {
            res.json(null);
        } else {
            res.json(users);
        }
    });
});

app.get('/unsubscribe', (req, res) => {
    res.sendFile(__dirname + '/public/unsubscribe.html');
});

app.post('/unsubscribe', (req, res) => {
    setInactive(req.body.email, req.body.handle, (err) => {
        if (err) {
            res.status(404).send(err);
        } else {
            res.send({});
        }
    });
});
    
app.post('/users', (req, res) => {
    addUser(req.body, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json({});
    });
});

app.put('/users/:email', (req, res) => {
    updateUser(req.params.email, req.body, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json({});
    });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running on port ${app.get('port')}`);
});

function addUser(user, callback) {
    const query = `INSERT INTO users (email, handles, daily)
        VALUES ($1, $2, TRUE);`;
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query(query, [ user.email, JSON.stringify(user.handles) ], (err, result) => {
            done();

            if (err) return callback(err);

            return callback(null, result);
        });
    });
};

function getUsers(email, callback) {
    let query = 'SELECT * FROM users';
    if (email) {
        query += ` WHERE email = \'${email}\';`; 
    } else {
        query += ';';
    }
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query(query, (err, result) => {
            done(); // releases the client back to the pool

            if (err) return callback(err);

            return callback(null, result.rows);
        });
    });
};

function setInactive(email, handle, callback) {
    const get_query = 'SELECT * FROM users WHERE email = $1;';
    const update_query = 'UPDATE users SET handles = $1 WHERE email = $2;';
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query(get_query, [ email ], (err, result) => {
            if (err) throw err;
            const user = result.rows[0];
            let set_active = false;
            if (!user) return callback('User not found.');
            async.eachSeries(user.handles, (each_handle, handle_callback) => {
                if (each_handle.handle === handle) {
                    if (!each_handle.active) return callback('Your email address is already unsubscribed from this Twitter handle.');
                    each_handle.active = false;
                    set_active = true;
                }
                return handle_callback(null);
            }, (err) => {
                if(!set_active) return callback('Handle not found.');

                client.query(update_query, [ JSON.stringify(user.handles), email ], (err, result) => {
                    done();

                    if (err) {
                        return callback(err);
                    }

                    return callback(null);
                });
            });
        });
    });
}

function updateUser(email, user, callback) {
    const query = `UPDATE users SET handles = $1 WHERE email = $2;`;
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query(query, [ JSON.stringify(user.handles), email ], (err, result) => {
            done();

            if (err) return callback(err);

            return callback(null, result);
        });
    });
};
