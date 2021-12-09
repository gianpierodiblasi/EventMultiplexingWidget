/* global TW */
TW.IDE.Widgets.eventmultiplexing = function () {
  this.widgetIconUrl = function () {
    return '../Common/extensions/EventMultiplexingWidget/ui/eventmultiplexing/multiplex.png';
  };

  this.widgetProperties = function () {
    return {
      'name': 'EventMultiplexing',
      'description': 'Widget to multiplex an event, it is an advanced version of standard event router',
      'category': ['Common'],
      'iconImage': 'multiplex.png',
      'properties': {
        'Width': {
          'description': 'width',
          'defaultValue': 200
        },
        'Height': {
          'description': 'height',
          'defaultValue': 28
        },
        'inOutType': {
          'description': 'The input/output type',
          'baseType': 'STRING',
          'defaultValue': 'STRING',
          'selectOptions': [
            {value: 'STRING', text: 'STRING'},
            {value: 'INTEGER', text: 'INTEGER'},
            {value: 'NUMBER', text: 'NUMBER'},
            {value: 'DATETIME', text: 'DATETIME'},
            {value: 'BOOLEAN', text: 'BOOLEAN'},
            {value: 'IMAGELINK', text: 'IMAGELINK'}
          ]
        },
        'numberOfEvents': {
          'description': 'The number of events',
          'baseType': 'INTEGER',
          'defaultValue': 5
        },
        'debugMode': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to activate the debug'
        }
      }
    };
  };

  this.widgetEvents = function () {
    return {
      'Triggered': {}
    };
  };

  this.renderHtml = function () {
    return '<div class="widget-content widget-eventmultiplexing">' + '<span class="eventmultiplexing-property">Event Multiplexing</span>' + '</div>';
  };

  this.afterRender = function () {
    this.addNewEventParameters(this.getProperty('inOutType'), this.getProperty('numberOfEvents'));
  };

  this.afterSetProperty = function (name, value) {
    if (name === 'inOutType' || name === 'numberOfEvents') {
      this.deleteOldEventParameters();

      switch (name) {
        case "inOutType":
          this.addNewEventParameters(value, this.getProperty('numberOfEvents'));
          break;
        case "numberOfEvents":
          this.addNewEventParameters(this.getProperty('inOutType'), value);
          break;
      }
    }

    return false;
  };

  this.deleteOldEventParameters = function () {
    var properties = this.allWidgetProperties().properties;
    delete properties['output'];

    for (var key in properties) {
      if (key.toLowerCase().startsWith("event")) {
        delete properties[key];
      } else if (key.toLowerCase().startsWith("value")) {
        delete properties[key];
      }
    }
  };

  this.addNewEventParameters = function (inOutType, numberOfEvents) {
    var properties = this.allWidgetProperties().properties;

    properties['output'] = {
      isBaseProperty: false,
      name: 'output',
      type: 'property',
      description: 'The output value',
      isBindingSource: true,
      baseType: inOutType,
      isEditable: false,
      isVisible: true
    };

    for (var eventN = 1; eventN <= numberOfEvents; eventN++) {
      properties['Value' + eventN] = {
        isBaseProperty: false,
        name: 'Value' + eventN,
        type: 'property',
        description: 'Value N. ' + eventN,
        isBindingTarget: true,
        baseType: inOutType,
        isLocalizable: inOutType === "STRING",
        isEditable: true,
        isVisible: true
      };

      properties['Event' + eventN] = {
        name: "Event" + eventN,
        type: "service",
        description: 'Service to call for event N. ' + eventN,
        isVisible: true
      };
    }

    this.updatedProperties({
      updateUI: true
    });
  };
};