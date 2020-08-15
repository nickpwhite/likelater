# frozen_string_literal: true

class UsersController < Clearance::UsersController
  def index
    redirect_to new_user_url
  end

  def new
    @user = user_from_params
  end

  def create
    @user = user_from_params
    @user.email_confirmation_token = Clearance::Token.new

    if @user.save
      UserMailer.email_confirmation(@user).deliver_later
      redirect_to root_path, notice: "Confirm your email address to log in"
    else
      render :new
    end
  end
end
