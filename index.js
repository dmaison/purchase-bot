const config = require( './config' ),
cluster = require( 'cluster' ),
cpus = require('os').cpus().length,
bot = require( './bot' );


/*

uncomment for when ready

// initial instance
if (cluster.isMaster) {
    console.log( `Creating bot worker(s) on ${ cpus } threads...` );
    for( var i = 0; i < cpus; i++ ) cluster.fork();

// child instances
} else {
    console.log( '\tInitiating worker...' );
    setInterval( bot.check, config.queryFrequency );
}
*/

bot.check();