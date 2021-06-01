## Using Bull with Upstash 
                                                                                      
                          
Configure `stalledInterval`, `guardInterval` and `drainDelay` for efficient use of bandwidth. 

See [the Bull docs](https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queue) for details about the advanced configuration parameters.

```javascript
var settings = {
    // lockDuration: 30000, // Key expiration time for job locks.
    // lockRenewTime: 15000, // Interval on which to acquire the job lock
    // maxStalledCount: 1, // Max amount of times a stalled job will be re-processed.
    // retryProcessDelay: 5000, // delay before processing next job in case of internal error.
    // backoffStrategies: {}, // A set of custom backoff strategies keyed by name.
    stalledInterval:  300000, // How often check for stalled jobs (use 0 for never checking).
    guardInterval:  300000, // Poll interval for delayed jobs and added jobs.
    drainDelay: 300 // A timeout for when the queue is in drained state (empty waiting for jobs).
}
var videoQueue = new Queue('video transcoding', 'YOUR_REDIS_URL', {settings: settings});


```