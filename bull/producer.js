var Queue = require('bull');

var settings = {
    stalledInterval:  0, // How often check for stalled jobs (use 0 for never checking).
    guardInterval:  3000000, // Poll interval for delayed jobs and added jobs.
    drainDelay: 300 // A timeout for when the queue is in drained state (empty waiting for jobs).
}
var videoQueue = new Queue('video transcoding', 'REDIS_URL');

videoQueue.add({video: 'http://example.com/aa.mov'});
videoQueue.add({video: 'http://example.com/bbb.mov'});
videoQueue.add({video: 'http://example.com/ccc.mov'});
videoQueue.add({video: 'http://example.com/vvv.mov'});
videoQueue.add({video: 'http://example.com/ddd.mov'});
videoQueue.add({video: 'http://example.com/fff.mov'});