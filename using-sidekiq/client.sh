#!/bin/bash

echo 'clearSchedules()' | bundle exec irb -r ./sendEmail.rb

# This one should send 4 messages, since enterprise immediately adds job to queue.
echo 'sendEmail("id1", "free")' | bundle exec irb -r ./sendEmail.rb
echo 'sendEmail("id2", "paid")' | bundle exec irb -r ./sendEmail.rb
echo 'sendEmail("id3", "enterprise")' | bundle exec irb -r ./sendEmail.rb
echo 'updateEmail("id3", "enterprise10k")' | bundle exec irb -r ./sendEmail.rb


# This one should send 3 messages, since paid type job is scheduled, but type is upgraded immediately after.
echo 'sendEmail("id4", "free")' | bundle exec irb -r ./sendEmail.rb
echo 'sendEmail("id5", "paid")' | bundle exec irb -r ./sendEmail.rb
echo 'sendEmail("id6", "enterprise")' | bundle exec irb -r ./sendEmail.rb
echo 'updateEmail("id5", "enterprise10k")' | bundle exec irb -r ./sendEmail.rb

sleep 25