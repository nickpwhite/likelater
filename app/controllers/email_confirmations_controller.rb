# frozen_string_literal: true

class EmailConfirmationsController < ApplicationController
  def show
    @user = User.find_by!(show_params)
    @user.confirm!
    sign_in @user

    redirect_to root_path, notice: "Email confirmed!"
  end

  private

  def show_params
    params.permit(:email_confirmation_token)
  end
end
