/* global TW */
TW.Runtime.Widgets.eventmultiplexing = function () {
  var thisWidget = this;

  this.runtimeProperties = function () {
    var debugMode = thisWidget.getProperty('debugMode');
    var inOutType = thisWidget.getProperty('inOutType');
    var numberOfEvents = this.getProperty('numberOfEvents');

    if (debugMode) {
      console.log("EventMultiplexing -> runtimeProperties");
      console.log("EventMultiplexing -> inOutType = " + inOutType + ", numberOfEvents = " + numberOfEvents);
    }

    var json = {
      'needsDataLoadingAndError': false
    };

    if (inOutType === "STRING") {
      json.propertyAttributes = {};
      for (var eventN = 1; eventN <= numberOfEvents; eventN++) {
        json.propertyAttributes['Value' + eventN] = {
          'isLocalizable': true
        };
      }

      if (debugMode) {
        console.log("EventMultiplexing -> runtimeProperties = " + JSON.stringify(json));
      }
    }

    return json;
  };

  this.renderHtml = function () {
    var html = '';
    html = '<div class="widget-content widget-eventmultiplexing" style="display:none;"></div>';
    return html;
  };

  this.afterRender = function () {
  };

  this.serviceInvoked = function (serviceName) {
    var debugMode = thisWidget.getProperty('debugMode');
    var inOutType = thisWidget.getProperty('inOutType');
    var value = thisWidget.getProperty(serviceName.replace("Event", "Value"));

    switch (inOutType) {
      case "INTEGER":
        value = parseInt(value, 10);
        break;
      case "NUMBER":
        value = parseFloat(value);
        break;
      case "DATETIME":
        value = new Date(value);
        break;
      case "BOOLEAN":
        value = value === 'true' || value === true;
        break;
    }

    if (debugMode) {
      console.log("EventMultiplexing -> Start");
      console.log("EventMultiplexing -> serviceName = " + serviceName + ", value = " + value);
    }

    thisWidget.setProperty("output", value);
    this.jqElement.triggerHandler('Triggered');

    if (debugMode) {
      console.log("EventMultiplexing -> Stop");
    }
  };
};