# frozen_string_literal: true

namespace :mailer do
  desc "Send likes_update email to all recipients"
  task send_likes_update: :environment do
    User.all.each { |user| UserMailer.with(user: user).likes_update.deliver_now }
  end
end
