/**
* A simple, highly customizable logging plugin for node.js
*/


// Module imports
var dateFormat = require('dateformat'),
  colors = require('colors');


// Container for Events registered by module
var events = { };


// Default Logging options
var options = {
  level: 0,
  format: "%timestamp% - %event%:%padding%  %message%",
  timestamp: "HH:MM:ss"
};


// Class Defintion of "log_event"
var LogEvent = (function() {
  /**
  * Constructor
  *
  * @param  {Object}  options
  */
  function LogEvent( options ) {
    this.event = options.event;
    this.level = options.level || 0;
    this.color = options.color || 'white';
  };

  /**
  * Configuring an event
  *
  * @param  {Object}  config
  * @return   {LogEvent} this
  */
  LogEvent.prototype.config = function( config ) {
    for(var key in config) {
      this[key] = config[key];
    }
    return this;
  }

  /**
  * Calculates the padding space required for prettier output
  *
  * No parameter is required
  * @return   {String}  padding_spaces
  */
  LogEvent.prototype.__defineGetter__ ('padding', function() {
    var maxLength = 0;
    var paddingLength;
    var padding = '';
    for(var key in events) {
      if (events.hasOwnProperty(key)) {
        maxLength = maxLength < events[key].event.length
          ? events[key].event.length
          : maxLength;
      }
    }
    paddingLength = maxLength - this.event.length;
    for(var i=0; i < paddingLength; i++) { padding += ' '; }
    return padding;
  });

  /**
  * Outputting the Event to Screen, only if its event is equal or above
  * the configuration level. Uses `console.log`
  *
  * @param  {Object}  input
  */
  LogEvent.prototype.output = function(input) {
    if(options.level <= this.level ) {
      var message = '';
      for(var i in input) {
        message += " ";
        message += ( typeof input[i] === "object"
          ? JSON.stringify( input[i], null )
          : input[i] );
      }
      var format = this.format || options.format;
      var output = format
            .replace( '%timestamp%', dateFormat( new Date(), this.timestamp || options.timestamp ) ) //timestamp
            .replace( '%event%', this.event[ this.color ] ) //log event & color
            .replace( '%padding%', this.padding )
            .replace( '%message%', message );
      console.log( output );
    }
  }

  return LogEvent;
})();


/**
* Configures the Global Options
*
* @param  {Object}  config
*/
exports.config = function( config ) {
  for(var key in config) {
    if(options.hasOwnProperty(key)) {
      options[key] = config[key];
    }
  }
  return this;
}

/**
* High-order function. The returned function returns the "LogEvent" object
* registered on the "events" object with its key/property name as "e"
* if no arguments are passed. Otherwise it outputs it to console.
*
* @param  {String}  e
* @param  {LogEvent|null}
*/
var nFn = function(e) {
  return function() {
    if(arguments.length==0) {
      return events[e];
    } else {
      events[e].output(arguments);
    }
  }
}


/**
* Defining new event types. "newEvents" is an object of options used to
* create new log events. The new event is defined on this "module" object
*
* @param  {Object}  newEvents
* @return   {LogEvent} this
*/
exports.new = function(newEvents) {
  for(event in newEvents) {
    events[event] = new LogEvent( newEvents[event] );
    this[event] = nFn(event);
  }
  return this;
}


/**
* Defintion of Custom Event types
*/
exports.new({
  debug: { color: 'grey', level: 0, event: 'debug' },
  info: { color: 'green', level: 1, event: 'info' },
  warn: { color: 'yellow', level: 2, event: 'warning' },
  error: { color: 'red', level: 3, event: 'error' }
});
