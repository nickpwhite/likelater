# likelater
Likelater is a service which reminds Twitter users about tweets that they have liked which contain links. Its main use case is to get an email reminder of the links you wanted to save for later.

## app.js
The app.js file contains the backend server with logic for registering and deregistering users, as well as updating users to add new Twitter handles to check.

## bin/send_emails
The send_emails file contains the logic for determining the email contents and sending the emails. The app is currently deployed to Heroku and uses the Heroku Scheduler addon to run the send_emails function every day at a given time.

## public/
This folder contains the frontend web application which is served by the express server run by app.js.

## Requirements
* NodeJS
* Postgresql (>= v9.5)

## Startup
1. Clone this repo
2. Create a PostgreSQL database and a user with full access to it
3. Set the `DATABASE_URL` environment variable to a postgresql connection string that corresponds to the username/password and database name you set
4. In the project directory run `npm install`
5. Run `npm start`
