# frozen_string_literal: true

class TwitterAccountsController < ApplicationController
  def create
    @user = User.find_or_create_by(email: user_params[:email])
    @account = TwitterAccount.new(handle: twitter_account_params[:handle], user: @user)

    respond_to do |format|
      if @account.save
        status_message = "Email alerts successfully enabled."
      else
        status_message = @account.errors.full_messages.join("\n")
      end
      format.js { render locals: { status_message: status_message } }
    end
  end

  private

  def twitter_account_params
    params.require(:twitter_account).permit(:handle, user: :email)
  end

  def user_params
    twitter_account_params[:user]
  end
end
