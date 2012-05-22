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

log_event.prototype.output = function(input) {
	if(options.level <= this.level ) {
		var message = '';
		for(var i in input) {
			message += " " + ( typeof input[i] == "object" ? JSON.stringify( input[i], null ) : input[i] );
		}
		var format = this.logformat || options.logformat;
			output = format
					.replace( '%time%', dateFormat( new Date(), this.timeformat || options.timeformat ) ) //timestamp
					.replace( '%event%', this.event[ this.color ] ) //log event & color
					.replace( '%padding%', this.padding )
					.replace( '%message%', message );
		console.log( output );
	}
}

exports.config = function( config ) {
	for(var key in config) {
		if(options.hasOwnProperty(key)) {
			options[key] = config[key];
		}
	}
	return this;
}

var nFn = function(e) {
	return function() { if(arguments.length==0) { return events[e] } else { events[e].output(arguments) } }
}

exports.new = function(newEvents) {
	for(event in newEvents) {
		events[event] = new log_event( newEvents[event] );
		this[event] = nFn(event);
	}
}

exports.new({
	info: { color: 'green', level: 0, event: 'info' },
	warn: { color: 'yellow', level: 1, event: 'warning' },
	error: { color: 'red', level: 2, event: 'error' }
});
