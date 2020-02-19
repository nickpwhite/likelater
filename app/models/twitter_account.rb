# frozen_string_literal: true

class TwitterAccount < ApplicationRecord
  belongs_to :user

  validates :handle, presence: true
  validates :user, uniqueness: {
    scope: :handle, case_sensitive: false, message: ->(account, data) do
      "#{data[:value].email} is already receiving updates from #{account.handle}."
    end
  }
end
