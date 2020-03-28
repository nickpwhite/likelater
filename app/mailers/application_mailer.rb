# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "hello@likelater.io"
  layout "mailer"
end
