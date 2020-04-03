# frozen_string_literal: true

class TwitterAccount < ApplicationRecord
  belongs_to :user

  validates :handle, presence: true
  validates :user, uniqueness: {
    scope: :handle, case_sensitive: false, message: lambda do |account, data|
      "#{data[:value].email} is already receiving updates from #{account.handle}."
    end
  }

  def likes_with_links_as_html
    update(latest_tweet_id: likes_with_links.first.id) if likes_with_links.first.present?

    likes_with_links.map do |tweet|
      tweet.oembed(hide_media: true, hide_thread: true, omit_script: true).html
    end
  end

  private

  def likes_with_links
    @likes_with_links ||=
      if latest_tweet_id.present?
        TwitterWrapper::ApiClient.favorites(handle, latest_tweet_id).select(&:contains_link?)
      else
        TwitterWrapper::ApiClient.favorites(handle).select(&:contains_link?).first(5)
      end
  end
end
