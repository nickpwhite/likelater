# frozen_string_literal: true

class SendUpdateJob
  include Sidekiq::Job

  def perform
    User.all.each { |user| UserMailer.with(user: user).likes_update.deliver_now }
  end
end
