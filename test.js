
var log = require('./logger');

log.level(3);

//log.format('%event%: %message%');

log.debug = log.new({ name: 'debug', color: 'yellow' });



log.info( 'hello world' );

log.warn( 'carefule there, world!' );

log.error( 'WTF world?!' );

log.debug( "here's some info to help you fix your problem!" );
