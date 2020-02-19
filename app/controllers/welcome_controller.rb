# frozen_string_literal: true

class WelcomeController < ApplicationController
  def index
    @twitter_account = TwitterAccount.new
  end
end
