# frozen_string_literal: true

class EmailConfirmationGuard < Clearance::SignInGuard
  def call
    if signed_out? || confirmed?
      next_guard
    else
      failure("You must confirm your email address.")
    end
  end

  def confirmed?
    current_user.confirmed_at.present?
  end

  def signed_out?
    !signed_in?
  end
end
