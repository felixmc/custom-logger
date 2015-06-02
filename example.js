var log = require('./logger').config({ level: 0 });

log.debug('hello?');

log.info('hello world!');

log.warn('careful there, world');

log.error('WHOA WHOA WHOA world!');

log.info("I see", "3", "bananas!") // Outputs "I see 3 bananas!"

log.config({
	messageFormatting: true
});

log.info("I see %d %s!", 3, "bananas"); // Outputs "I see 3 bananas!"
