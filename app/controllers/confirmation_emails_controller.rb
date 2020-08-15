# frozen_string_literal: true

class ConfirmationEmailsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    user = User.find_by(create_params)

    UserMailer.email_confirmation(user).deliver_later unless user.nil?

    redirect_to new_session_url,
      notice: "If an account exists with that email address, we will send it a confirmation email."
  end

  private

  def create_params
    params.require(:user).permit(:email)
  end
end
