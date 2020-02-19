# frozen_string_literal: true

Rails.application.routes.draw do
  get 'welcome/index'

  resources :twitter_accounts, only: [:create]

  root 'welcome#index'
end
