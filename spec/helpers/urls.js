

(function (jasmine) {

  let uuidRegexp = require("uuid-regexp/regexp").versioned.source;

  jasmine.idUrlRegexp = function makeRegexp (a, b) {
    if (1 === arguments.length) {
      return new RegExp(`${regexpSource(a)}\$`, "i");
    }
    if (2 === arguments.length) {
      return new RegExp(`${regexpSource(a)}\/${regexpSource(b)}\$`, "i");
    }
    return null;
  };

  function regexpSource (objectType) {
    return `${objectType}/${uuidRegexp}`;
  }

})(jasmine);
