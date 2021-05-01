var Queue = require('bull');

var videoQueue = new Queue('video transcoding', 'REPLACE_REDIS_URL_HERE')
// var videoQueue = new Queue('video transcoding', 'redis://127.0.0.1:6379');


videoQueue.process(function(job, done){
    console.log(job.data)
    done();
}).catch(err => {
    console.log(err)
});


videoQueue.add({video: 'http://example.com/video1.mov'});