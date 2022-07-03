# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_04_28_185425) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "liked_tweets", force: :cascade do |t|
    t.text "content", null: false
    t.bigint "twitter_id", null: false
    t.bigint "twitter_account_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["twitter_account_id"], name: "index_liked_tweets_on_twitter_account_id"
    t.index ["twitter_id"], name: "index_liked_tweets_on_twitter_id", unique: true
  end

  create_table "likes", force: :cascade do |t|
    t.bigint "tweet_id"
    t.bigint "twitter_account_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tweet_id"], name: "index_likes_on_tweet_id"
    t.index ["twitter_account_id"], name: "index_likes_on_twitter_account_id"
  end

  create_table "tweets", force: :cascade do |t|
    t.bigint "tw_id", null: false
    t.text "urls", array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tw_id"], name: "index_tweets_on_tw_id"
  end

  create_table "twitter_accounts", force: :cascade do |t|
    t.string "handle", null: false
    t.bigint "latest_tweet_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["handle", "user_id"], name: "index_twitter_accounts_on_handle_and_user_id", unique: true
    t.index ["user_id"], name: "index_twitter_accounts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "encrypted_password", limit: 128
    t.string "confirmation_token", limit: 128
    t.string "remember_token", limit: 128
    t.datetime "confirmed_at"
    t.string "email_confirmation_token", default: "", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["remember_token"], name: "index_users_on_remember_token"
  end

  add_foreign_key "liked_tweets", "twitter_accounts"
end
