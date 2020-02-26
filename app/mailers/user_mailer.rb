# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def likes_update
    @user = params[:user]
    @accounts = @user.twitter_accounts.where(active: true)

    @handles_to_tweets = @accounts.each_with_object({}) do |account, h|
      h[account.handle] = account.likes_with_links_as_html
    end

    if @handles_to_tweets.values.all?(&:empty?)
      logger.info "No new tweets for #{@user.email}, not sending email."
      return
    end

    mail(to: @user.email, subject: "Daily link recap")
  end
end
