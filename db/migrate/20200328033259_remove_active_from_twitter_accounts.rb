class RemoveActiveFromTwitterAccounts < ActiveRecord::Migration[6.0]
  def change
    remove_column :twitter_accounts, :active
  end
end
