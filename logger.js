var dateFormat = require('dateformat'),
	colors = require('colors');

var events = { };

var options = {
	level: 0,
	logformat: "%time% - %event%:%padding%  %message%",
	timeformat: "HH:MM:ss"
};

function log_event( options ) {
	this.event = options.event;
	this.level = options.level || 0;
	this.color = options.color || 'green';
};

log_event.prototype.setName = function(name) { this.name = name };

log_event.prototype.setLevel = function(level) { this.level = level };

log_event.prototype.setColor = function(color) { this.color = color };

log_event.prototype.__defineGetter__ ('padding', function() {
	var length = 0,
		padding = '';
	for(var key in events) {
		if(events.hasOwnProperty(key))
			length = length < events[key].event.length ? events[key].event.length : length;
	}
	for(var i=0;i<length-this.event.length;i++) { padding += ' ' }
	return padding;
});

log_event.prototype.output = function(message, event) {
	if(options.level <= this.level ) {
		message = typeof message == "object" ? JSON.stringify( message, null, "\t" ) : message;
		var format = this.logformat || options.logformat;
			output = format
					.replace( '%time%', dateFormat( new Date(), this.timeformat || options.dateformat ) ) //timestamp
					.replace( '%event%', this.event[ this.color ] ) //log event & color
					.replace( '%padding%', this.padding )
					.replace( '%message%', message );
		console.log( output );
	}
}

exports.config = function( config ) {
	for(var key in config) {
		if(options.hasOwnPropert(key)) {
			options[key] = config[key];
		}
	}
}

exports.new = function(newEvents) {
	for(var event in newEvents) {
		events[event] = new log_event( newEvents[event] );
		this[event] = function() {
			if(arguments.length==0) {
				return events[event];
			} else {
				events[event].output(arguments);
			}
		}
	}
}


exports.new({ info: { color: 'green', level: 0, event: 'info' } });

exports.new({ warn: { color: 'green', level: 0, event: 'warning' } });

console.log( exports.info().padding.length );

//exports.output = function() {
	
//}

	/*
		EVENTS:
		0 => info
		1 => warning
		2 => error
	*/

