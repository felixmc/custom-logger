var log = require('./logger').config({ level: 0 });

log.debug('hello?');

log.info('hello world!');
	
log.warn('careful there, world');
	
log.error('WHOA WHOA WHOA world!');
