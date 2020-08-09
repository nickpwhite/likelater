# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def likes_update
    @user = params[:user]
    @accounts = @user.twitter_accounts
    @handles_to_tweets = handles_to_tweets

    if @handles_to_tweets.values.all?(&:empty?)
      logger.info "No new tweets for #{@user.email}, not sending email"
      return
    end

    mail(to: @user.email, subject: "Daily link recap")
  end

  def one_time_password_reset
    @user = params[:user]

    unless @user.encrypted_password.nil?
      logger.info "#{@user.email} already has a password, no need to reset it"
      return
    end

    @user.forgot_password!

    mail(to: @user.email, subject: "Set your Likelater password")
  end

  private

  def handles_to_tweets
    @accounts.each_with_object({}) do |account, h|
      h[account.handle] = account.likes_with_links_as_html
    end
  end
end
