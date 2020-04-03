# frozen_string_literal: true

class TwitterAccountsController < ApplicationController
  def create
    @user = User.find_or_initialize_by(email: user_params[:email])
    @account = TwitterAccount.new(handle: account_params[:handle], user: @user)

    status_message = try_create_account

    respond_to do |format|
      format.js { render "form_status", locals: { status_message: status_message } }
    end
  end

  def destroy
    email = user_params[:email]
    handle = account_params[:handle]
    @user = User.find_by(email: email)
    @account = TwitterAccount.find_by(handle: handle, user: @user)

    status_message = format(try_destroy_account, email, handle)

    respond_to do |format|
      format.js { render "form_status", locals: { status_message: status_message } }
    end
  end

  private

  def try_create_account
    if @user.save && @account.save
      "Email alerts successfully enabled."
    else
      [@user, @account].flat_map { |record| record.errors.full_messages }.join("\n")
    end
  end

  def try_destroy_account
    if @user.nil?
      "%s is not signed up for Likelater."
    elsif @account.nil?
      "%s is not signed up to receive updates from @%s."
    elsif @account.destroy
      try_destroy_user
    else
      "Something went wrong. Please try again later or contact hello@likelater.io."
    end
  end

  def try_destroy_user
    if @user.twitter_accounts.empty?
      @user.destroy
      "%s will no longer receive updates from Likelater."
    else
      "%s will no longer receive updates from @%s."
    end
  end

  def account_params
    params.require(:twitter_account).permit(:handle, user: :email)
  end

  def user_params
    account_params[:user]
  end
end
