# frozen_string_literal: true

require "twitter"

module TwitterWrapper
  class ApiClient
    @client = Twitter::REST::Client.new(
      consumer_key: ENV["TWITTER_CONSUMER_KEY"],
      consumer_secret: ENV["TWITTER_CONSUMER_SECRET"],
      bearer_token: ENV["TWITTER_BEARER_TOKEN"]
    )

    class << self
      attr_reader :client

      def favorites(user_identifier, since_id = nil)
        options = {
          count: 200,
          include_entities: true,
        }
        options[:since_id] = since_id if since_id.present?
        client.favorites(user_identifier, options).map { |tweet| Tweet.new(tweet) }
      end

      def oembed(tweet, options = {})
        Oembed.new(client.oembed(tweet, options))
      end
    end
  end
end
