# config.ru

require './app.rb'
require 'sidekiq'
require "sidekiq/api"

run Sinatra::Application