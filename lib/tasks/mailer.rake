# frozen_string_literal: true

namespace :mailer do
  desc "Send likes_update email to all recipients"
  task send_likes_update: :environment do
    User.all.each { |user| UserMailer.with(user: user).likes_update.deliver_now }
  end

  desc "Send one_time_password_reset email to users who do not have a password"
  task send_one_time_password_reset: :environment do
    User.all.each do |user|
      UserMailer.with(user: user).one_time_password_reset.deliver_now
    end
  end
end
