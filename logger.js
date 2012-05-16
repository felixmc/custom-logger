var dateFormat = require('dateformat'),
	colors = require('colors');

var log_level = 3,
	timestamp = "HH:MM:ss";

/*
	LOGGING:
	0 => nothing
	1 => only errors
	2 => error + warnings only
	3 => everything
*/

exports.level = function(level) {
	log_level = level;
}

exports.timeFormat = function(format) {
	timestamp = format;
}

exports.info = function(message) {
	this.log(message, 0);
}

exports.warn = function(message) {
	this.log(message, 1);
}

exports.error = function(message) {
	this.log(message, 2);
}

exports.log = function(message, event_type) {
/*
	EVENTS:
	0 => info
	1 => warning
	2 => error
*/
	if(event_type == undefined) event_type = 0;
	if(log_level >= (3 - event_type) ) {
		var events = [ { name: 'info', color: 'green', padding: '    ' }, { name: 'warning', color: 'yellow', padding: ' ' }, { name: 'error', color: 'red', padding: '   ' } ],
			base = dateFormat( new Date(), timestamp ) + //timestamp
			' - ' + (events[event_type].name)[ events[event_type].color ] + ':' + //colored log type
			events[event_type].padding + ' '; //padding
		if(typeof message == "object") {
			console.log( base + "%j", message );
		} else {
			console.log( base + message );
		}
	}
}
