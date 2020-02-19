class CreateTwitterAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :twitter_accounts do |t|
      t.string :handle, null: false
      t.boolean :active, null: false, default: true
      t.bigint :latest_tweet_id
      t.belongs_to :user

      t.timestamps

      t.index [:handle, :user_id], unique: true
    end
  end
end
