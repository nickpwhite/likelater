# frozen_string_literal: true

class TwitterAccount < ApplicationRecord
  belongs_to :user

  validates :handle, presence: true
end
