var cluster = require('cluster');
var server = require('./server');

var intel = require('intel');
var fileLog = './log.txt';


intel.basicConfig({
  'file': './log.txt',
  'format': '[%(date)s] :%(message)s'
});


var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {


console.log('DayZServlet: Starting hive on port 85.');
intel.console();


  // Fork workers.
  for (var i = 0; i <4; i++) {
  intel.info('Starting worker: ' + (i+1) +' /  4');
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
	if( signal ) {
    console.log("worker was killed by signal: "+signal);
  } else if( code !== 0 ) {
    console.log("worker exited with error code: "+code);
  }
    cluster.fork();
  });
} else {

  intel.console();

  server.start();
}


