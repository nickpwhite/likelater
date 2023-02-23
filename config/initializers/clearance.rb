require_relative "../../app/lib/email_confirmation_guard"

Clearance.configure do |config|
  config.mailer_sender = "hello@likelater.io"
  config.rotate_csrf_on_sign_in = true
  config.routes = false
  config.sign_in_guards = [EmailConfirmationGuard]
end
