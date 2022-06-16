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
        value = value ? new Date(value) : null;
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

  this.updateProperty = function (updatePropertyInfo) {
    if (updatePropertyInfo.TargetProperty.startsWith("Value")) {
      var inOutType = thisWidget.getProperty('inOutType');

      switch (inOutType) {
        case "INTEGER":
          this.setProperty(updatePropertyInfo.TargetProperty, parseInt(updatePropertyInfo.SinglePropertyValue, 10));
          break;
        case "NUMBER":
          this.setProperty(updatePropertyInfo.TargetProperty, parseFloat(updatePropertyInfo.SinglePropertyValue));
          break;
        case "DATETIME":
          this.setProperty(updatePropertyInfo.TargetProperty, updatePropertyInfo.SinglePropertyValue ? new Date(updatePropertyInfo.SinglePropertyValue) : null);
          break;
        case "BOOLEAN":
          this.setProperty(updatePropertyInfo.TargetProperty, updatePropertyInfo.SinglePropertyValue === 'true' || updatePropertyInfo.SinglePropertyValue === true);
          break;
        default:
          this.setProperty(updatePropertyInfo.TargetProperty, updatePropertyInfo.RawSinglePropertyValue);
          break;
      }
    }
  };
};