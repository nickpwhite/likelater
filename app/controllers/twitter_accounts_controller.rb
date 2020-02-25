# frozen_string_literal: true

class TwitterAccountsController < ApplicationController
  def create
    @user = User.find_or_initialize_by(email: user_params[:email])
    @account = TwitterAccount.new(handle: account_params[:handle], user: @user)

    respond_to do |format|
      if @user.save && @account.save
        status_message = "Email alerts successfully enabled."
      else
        errors = [@user, @account].map { |record| record.errors.full_messages }.flatten
        status_message = errors.join("\n")
      end
      format.js { render "form_status", locals: { status_message: status_message } }
    end
  end

  def destroy
    email = user_params[:email]
    handle = account_params[:handle]
    @user = User.find_by(email: email)
    @account = TwitterAccount.find_by(handle: handle, user: @user)

    respond_to do |format|
      if @user.nil? && @account.nil?
        status_message = "#{email} is not signed up for Likelater."
      elsif @account.nil?
        status_message = "#{email} is not signed up to receive updates from #{handle}."
      elsif @user.nil?
        status_message = "Something went wrong, please contact us at hello@likelater.io."
      elsif @account.destroy
        status_message = "#{email} will no longer receive updates from #{handle}."
      else
        status_message =
          "Something went wrong. Please try again later or contact hello@likelater.io."
      end
      format.js { render "form_status", locals: { status_message: status_message } }
    end
  end

  private

  def account_params
    params.require(:twitter_account).permit(:handle, user: :email)
  end

  def user_params
    account_params[:user]
  end
end
