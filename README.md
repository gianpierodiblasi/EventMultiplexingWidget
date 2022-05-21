# EventMultiplexingWidget
An extension to multiplex an event.

## Description
This extension provides a widget to multiplex an event, it is an advanced version of standard event router, but it is event-driven instead of value-driven.

## Properties
- debugMode - BOOLEAN (default = false): if set to true it sends to the browser's JS console a set of information useful for debugging the widget
- inOutType - STRING (default = 'STRING'): The input/output type (options: STRING, INTEGER, NUMBER, DATETIME, BOOLEAN, IMAGELINK)
- numberOfEvents - INTEGER (default = 5): The number of events
- output - \<inOutType\> (no default value): the output value, the type depends on the inOutType property
- Value1, ..., Value\<numberOfEvents> - \<inOutType\> (no default value): dynamic properties based on the value of numberOfEvents, the type depends on the inOutType property

## Services
- Event1, ..., Event\<numberOfEvents\>: dynamic services to call for events

## Events
- Triggered: event to notify a triggering
  
## Donate
If you would like to support the development of this and/or other extensions, consider making a [donation](https://www.paypal.com/donate/?business=HCDX9BAEYDF4C&no_recurring=0&currency_code=EUR).
