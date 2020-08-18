# Likelater

Likelater is a web app that emails users a recap of the tweets they've liked on Twitter that contain
links. To use Likelater, visit [likelater.io](https://www.likelater.io).

## Requirements
Likelater is developed and tested against:
- Ruby 2.6.6
- Rails 6.0

It also requires the following dependencies:
- Bundler
- Postgresql

## Getting Started
1. Set DATABASE_URL in your shell environment to something like this:
```bash
export DATABASE_URL='postgresql://<postgres_user>:<postgres_password>@localhost:5432'
```
2. Run the following to load the database:
```bash
bin/rails db:create db:schema:load
```
3. Run the rails server:
```bash
bin/rails s
```

You should be able to load Likelater in your web browser at localhost:3000.
