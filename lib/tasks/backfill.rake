# frozen_string_literal: true

namespace :backfill do
  desc "Backfill an email confirmation token for all users without one"
  task email_confirmation_token: :environment do
    User.where(email_confirmation_token: "").each do |user|
      user.update_attribute(:email_confirmation_token, Clearance::Token.new)
    end
  end
end
