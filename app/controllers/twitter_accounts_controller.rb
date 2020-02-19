# frozen_string_literal: true

class TwitterAccountsController < ApplicationController
  def create
    @user = User.find_or_create_by(email: user_params[:email])
    @account = TwitterAccount.create(handle: twitter_account_params[:handle], user: @user)
  end

  private

  def twitter_account_params
    params.require(:twitter_account).permit(:handle, user: :email)
  end

  def user_params
    twitter_account_params[:user]
  end
end
