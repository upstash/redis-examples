var Queue = require('bull');

var settings = {
    stalledInterval: 300000, // How often check for stalled jobs (use 0 for never checking).
    guardInterval: 300000, // Poll interval for delayed jobs and added jobs.
    drainDelay: 300 // A timeout for when the queue is in drained state (empty waiting for jobs).
}

var taskQueue = new Queue('employee registration',
    {redis: {port: 32016, host: 'us1-upward-ant-32016.upstash.io', password: 'ake4ff120d6b4216df220736be7eab087', tls: {}}}
    , settings);

taskQueue.process(function (job, done) {
    console.log(job.data)
    done();
}).catch(err => {
    console.log(err)
});
