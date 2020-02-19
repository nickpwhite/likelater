class User < ApplicationRecord
  has_many :twitter_accounts

  validates :email, presence: true,
    format: { with: /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
end
