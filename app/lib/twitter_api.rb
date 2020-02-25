# frozen_string_literal: true

require "twitter"

class TwitterApi
  @@client = Twitter::REST::Client.new(
    consumer_key: ENV["TWITTER_CONSUMER_KEY"],
    consumer_secret: ENV["TWITTER_CONSUMER_SECRET"],
    bearer_token: ENV["TWITTER_BEARER_TOKEN"]
  )

  class << self
    def favorites(user_identifier, since_id = nil)
      options = {
        count: 200
      }
      options[:since_id] = since_id if since_id.present?
      @@client.favorites(user_identifier, options)
    end

    def oembed(tweet, options = {})
      @@client.oembed(tweet, options)
    end
  end
end
