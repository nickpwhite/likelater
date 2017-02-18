var _ = require('lodash');
var http = require('http');
var nodemailer = require('nodemailer');
var querystring = require('querystring');
var twitter = require('twitter');

var client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    bearer_token: process.env.BEARER_TOKEN
});

http.get('http://localhost:3000/users', (response) => {
    response.on('data', (users) => {
        users = JSON.parse(users);
        _.forEach(users, (user) => {
            var links = [];
            var email_body = '<ul>';

            var get_options = {
                screen_name: user.screen_name,
                since_id: user.latest_id,
                count: '200'
            }

            client.get('favorites/list', get_options, (error, tweets) => {
                if(error) console.error(error);
                _.forEach(tweets, (tweet) => {
                    if (tweet.id !== user.latest_id) {
                        var urls = tweet['entities']['urls'];
                        _.forEach(urls, (url) => {
                            if (!url.expanded_url.match(/twitter\.com\/.*\/status\//g)) {
                                links.push(url);
                            }
                        });
                    }
                });
                _.forEach(links, (link, index) => {
                    email_body += '\n<li><a href="' + link.url + '">' + link.display_url + '</a></li>';
                });
                email_body += '\n</ul>';
                if (links.length === 0) {
                    email_body = 'You\'re all caught up for the day! Check back tomorrow for some more tweets.';
                }
                var mailOptions = {
                    port: 465,
                    host: "mail.privateemail.com",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD
                    }
                };
                var transporter = nodemailer.createTransport(mailOptions);

                transporter.sendMail({
                        from: 'nick@nickwhite.co',
                        to: user.email_address,
                        subject: 'Daily link recap',
                        html: email_body        
                    }, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        //console.log(info);
                    }
                );

                var put_options = {
                    port: 3000,
                    method: 'PUT',
                    path: '/users/' + user.id,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                if (tweets.length !== 0) {
                    user["latest_id"] = tweets[0].id;
                }

                var update_req = http.request(put_options, (response) => {
                    //console.log('Updated user');
                });

                update_req.write(JSON.stringify(user));
                update_req.end();
            });
        });
    });
});
