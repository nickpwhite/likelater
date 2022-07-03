# frozen_string_literal: true

source "https://rubygems.org"

ruby "2.7.6"

gem "bootsnap", ">= 1.4.2", require: false
gem "clearance", "~> 2.2"
gem "pg", "~> 1.2.2"
gem "postmark-rails", "~> 0.22"
gem "puma", "~> 4.3"
gem "rails", "~> 6.0"
gem "sass-rails", ">= 6"
gem "sidekiq", "~> 6.5"
gem "sidekiq-cron", "~> 1.6"
gem "twitter", "~> 7"
gem "webpacker", "~> 5.0"

group :development, :test do
  # Call "byebug" anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  gem "pry-rails"
end

group :development do
  gem "listen", ">= 3.0.5", "< 3.2"
  gem "rubocop"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  # Access an interactive console on exception pages or by calling "console" anywhere in the code.
  gem "web-console", ">= 3.3.0"
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem "capybara", ">= 2.15"
  gem "rspec-rails", "~> 4.0.0"
  gem "selenium-webdriver"
  # Easy installation and use of web drivers to run system tests with browsers
  gem "webdrivers"
end
