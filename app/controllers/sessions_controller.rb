# frozen_string_literal: true

class SessionsController < Clearance::SessionsController
  def create
    @user = authenticate(params)

    sign_in(@user) do |status|
      if status.success?
        redirect_back_or url_after_create
      else
        @failure = true
        render :new
      end
    end
  end
end
