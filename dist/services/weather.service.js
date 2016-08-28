'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WeatherService = function () {
  function WeatherService(config) {
    _classCallCheck(this, WeatherService);

    this._apiRoot = config.weather.apiRoot;
  }

  _createClass(WeatherService, [{
    key: 'current',
    value: function current(_ref) {
      var units = _ref.units;
      var lat = _ref.lat;
      var lon = _ref.lon;
      var lang = _ref.lang;

      if (!this._apiRoot) {
        throw Error('rx-ballparks-services configuration must specify weather api root');
      }
      var qs = {
        units: units || 'm',
        geocode: lat + ',' + lon,
        language: lang || 'en-US'
      };

      console.log('Fetching weather data', this._apiRoot + '/api/weather/v2/observations/current');

      return _rx2.default.Observable.fromPromise((0, _requestPromise2.default)({
        method: 'GET',
        uri: this._apiRoot + '/api/weather/v2/observations/current',
        qs: qs,
        json: true
      }));
    }
  }]);

  return WeatherService;
}();

exports.default = WeatherService;