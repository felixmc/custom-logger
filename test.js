
var log = require('./logger');

//log.level(1);

//log.format('%event%: %message%');

log.config({ dateformat: "HH" });

log.info( 'something happened', { header: "HTTP v1.1", status: "200" } );

log.error( 'SHIT' );
