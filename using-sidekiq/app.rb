#!/usr/bin/env ruby

require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require './sendEmail.rb'

greeting="<h1>Sidekiq with Upstash Redis!</h1>"

get '/' do
  greeting
end

get '/register/:id/:plan' do
  sendEmail(params[:id], params[:plan])
  "<h1>Email is queued.</h1>"
end

get '/update/:id/:plan' do
  updateEmail(params[:id], params[:plan])
  "<h1>Updated Email is queued.</h1>"
end

get '/clear' do
  clearSchedules()
  "<h1>Queue and the schedules are cleared.</h1>"
end

get '/:name' do
  greeting+"</br>and hello to #{params[:name]}"
end