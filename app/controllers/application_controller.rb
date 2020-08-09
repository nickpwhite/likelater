# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Clearance::Controller

  private

  def sign_in_url
    new_session_url
  end
end
