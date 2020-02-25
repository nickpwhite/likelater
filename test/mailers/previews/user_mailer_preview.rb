# frozen_string_literal: true

class UserMailerPreview < ActionMailer::Preview
  def likes_update
    User.first.twitter_accounts.update_all(latest_tweet_id: nil)

    UserMailer.with(user: User.first).likes_update
  end
end
