'use strict';

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

app.post('/unsubscribe', (req, res) => {
    setInactive(req.body.encrypted_email, (err) => {
        if (err) {
            console.error(err);
        }
        return;
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
    const query = `INSERT INTO users (email, handles, daily, active)
        VALUES ($1, $2, TRUE, TRUE);`;
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query(query, [ user.email, JSON.stringify(user.handles) ], (err, result) => {
            done();

            if (err) return callback(err);

            return callback(null, result);
        });
    });
};

function getUsers(email, callback) {
    let query = 'SELECT * from users';
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

function setInactive(email, callback) {
    const query = 'UPDATE users SET active = FALSE WHERE email = $1;';
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
        client.query(query, [ email ], (err) => {
            done();

            if (err) return callback(err);
            
            return callback(null);
        })
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
