# frozen_string_literal: true

module TwitterWrapper
  class Tweet
    delegate :attrs, :id, :urls, :urls?, to: :@tweet

    TWITTER_URL_PATTERN = /twitter\.com\/.*\/status\//
    private_constant :TWITTER_URL_PATTERN

    def initialize(tweet)
      @tweet = tweet
    end

    def contains_link?
      urls? && urls.any? { |url| !TWITTER_URL_PATTERN.match?(url.expanded_url) }
    end

    def oembed(options = {})
      ApiClient.oembed(@tweet, options)
    end
  end
end
