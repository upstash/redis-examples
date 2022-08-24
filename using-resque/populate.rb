
require "resque"
require "./processes"
require "./constants"

Resque.redis = connection_url()
puts connection_url()

Resque.enqueue(Enterprise, 'hard', 'process_1')
Resque.enqueue(Free, 'easy', 'process_2')
Resque.enqueue(Enterprise, 'easy', 'process_3')

sleep 10
Resque.enqueue(Free, 'hard', 'process_4')
Resque.enqueue(Enterprise, 'easy', 'process_5')
Resque.enqueue(Free, 'easy', 'process_6')
