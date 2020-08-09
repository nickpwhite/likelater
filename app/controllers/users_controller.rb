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

    if @user.save
      sign_in @user
      redirect_back_or url_after_create
    else
      render :new
    end
  end
end
