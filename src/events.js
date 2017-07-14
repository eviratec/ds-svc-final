"use strict";

module.exports = function (dataStudio) {

  const EventEmitter = require("events");

  class DataStudioEmitter extends EventEmitter {
    constructor () {
      super();
    }
  }

  dataStudio.events = new DataStudioEmitter();

}
