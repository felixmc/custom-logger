var dateFormat = require('dateformat'),
	colors = require('colors');

var log = {
	events: { info: { color: 'green', level: 0 }, warning: { color: 'yellow', level: 1 }, error: { color: 'red', level: 2 } },
	level: 3,
	logformat: "%time% - %event%:%padding%  %message%",
	timeformat: "HH:MM:ss",
	padding: function(event) {
		var length = 0,
			padding = '',
			event = event || '';
		for(var key in this.events) {
			if(this.events.hasOwnProperty(key))
				length = length < key.length ? key.length : length;
		}
		for(var i=0;i<length-event.length;i++) { padding += ' ' }
		return padding;
	},
	output: function(message, event) {
		/*
			EVENTS:
			0 => info
			1 => warning
			2 => error
		*/
		if(event == undefined) {
			console.log( typeof message == "object" ? JSON.stringify( message, null, "\t" ) : message );
		} else if(this.level <= this.events[event].level ) {
			message = typeof message == "object" ? JSON.stringify( message, null, "\t" ) : message;
			var output = this.logformat
						.replace( '%time%', dateFormat( new Date(), this.timeformat ) ) //timestamp
						.replace( '%event%', event[ this.events[event].color ] ) //log event & color
						.replace( '%padding%', this.padding( event ) )
						.replace( '%message%', message );
			console.log( output );
		}
	}
};

exports.level = function(level) {
	log.level = level;
}

exports.format = function(format) {
	log.logformat = format;
}

exports.timestamp = function(format) {
	log.timeformat = format;
}

exports.new = function(options) {
	if( log.events[ options.name ] == undefined )
		log.events[ options.name ] = { color: options.color || 'green', level: options.level || 0 };	
	else
		log.events[ options.name ] = { color: options.color || log.events[ options.name ].color, level: options.level || log.events[ options.level ] };
	return function(message) { log.output(message, options.name) }
}

exports.info = function(message) {
	log.output(message, "info");
}

exports.warn = function(message) {
	log.output(message, "warning");
}

exports.error = function(message) {
	log.output(message, "error");
}
