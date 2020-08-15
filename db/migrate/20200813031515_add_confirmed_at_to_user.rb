class AddConfirmedAtToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :confirmed_at, :datetime
    add_column :users, :email_confirmation_token, :string, null: false, default: ""
  end
end
