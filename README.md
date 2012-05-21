If you have any questions or feedback or need any help using this module, please contact <a href="http://twitter.com/#!/felix_mc" target="_blank">@felix_mc</a>.

# custom-logger

`custom-logger` is a simple, yet highly customizable logging plugin for node.js.

## Basic Usage

	var log = require('custom-logger');
	
	log.level(0);
	
	log.info( 'hello world!' );
	
	log.warn( 'carefule there, world!' );
	
	log.error( 'WHOA WHOA WHOA world?!' );

The above code will render to: 

![basic output snapshot](https://github.com/felixmc/custom-logger/raw/master/snapshots/basic.png)

`custom-logger` uses logging levels and different logging events to determine what is being outputed at any given time. Below are the default logging events and their respective logging levels:

	0 => info
	1 => warn
	2 => error

You can use the `log.level()` method to set the current logging level. `custom-log` will only show events whose level is **equal to or higher** than the one set. For example a level of `0` will show all events, whereas a level of `1` will only show the events `warning` and `error`.
