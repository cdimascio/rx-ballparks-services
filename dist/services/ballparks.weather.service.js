'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _ballparks = require('./ballparks.service');

var _ballparks2 = _interopRequireDefault(_ballparks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INTERVAL = 1000 * 60 * 60 * 1.5;

var _cache = {};

var BallparksWeatherService = function () {
  function BallparksWeatherService(config, weatherService) {
    _classCallCheck(this, BallparksWeatherService);

    this._useMockData = config.weather && config.weather.useMockData;
    this._weatherService = weatherService;
  }

  _createClass(BallparksWeatherService, [{
    key: 'all',
    value: function all() {
      return _ballparks2.default.all().map(function (park) {
        return _extends({}, park, { weather: _cache[park.id] });
      }).toArray();
    }
  }, {
    key: 'byId',
    value: function byId(id) {
      return _ballparks2.default.byId().map(function (park) {
        return _extends({}, park, { weather: _cache[park.id] });
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      var $stream = _rx2.default.Observable.timer(0, INTERVAL);
      return this._useMockData ? $stream.flatMap(function () {
        return _this._fakedata();
      }) : $stream.flatMap(function () {
        return _this._update();
      });
    }
  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      console.log('update weather data');
      return _ballparks2.default.all().flatMap(function (park) {
        return _this2._weatherService.current({
          lat: park.lat,
          lon: park.long,
          units: 'e'
        }).do(function (x) {
          console.log('' + park.id, x);
          _cache[park.id] = x;
        });
      });
    }
  }, {
    key: '_fakedata',
    value: function _fakedata() {
      console.log('fake weather data');
      var fakeData = {
        "metadata": {
          "language": "en-US",
          "transaction_id": "1472924965115:-424451040",
          "version": "1",
          "latitude": 45.42,
          "longitude": 75.69,
          "units": "m",
          "expire_time_gmt": 1472926500,
          "status_code": 200
        },
        "observation": {
          "key": "36821",
          "class": "observation",
          "expire_time_gmt": 1472926500,
          "obs_id": "36821",
          "obs_name": "Bakanas",
          "valid_time_gmt": 1472914800,
          "day_ind": "N",
          "temp": 23,
          "wx_icon": 27,
          "icon_extd": 2700,
          "wx_phrase": "Mostly Cloudy",
          "pressure_tend": 1,
          "pressure_desc": "Rising",
          "dewPt": 5,
          "heat_index": 23,
          "rh": 31,
          "pressure": 965.4,
          "vis": null,
          "wc": 23,
          "wdir": 70,
          "wdir_cardinal": "ENE",
          "gust": null,
          "wspd": 4,
          "max_temp": 34,
          "min_temp": null,
          "precip_total": null,
          "precip_hrly": null,
          "snow_hrly": null,
          "uv_desc": "Low",
          "feels_like": 23,
          "uv_index": 0,
          "qualifier": null,
          "qualifier_svrty": null,
          "blunt_phrase": null,
          "terse_phrase": null,
          "clds": 25,
          "water_temp": null,
          "primary_wave_period": null,
          "primary_wave_height": null,
          "primary_swell_period": null,
          "primary_swell_height": null,
          "primary_swell_direction": null,
          "secondary_swell_period": null,
          "secondary_swell_height": null,
          "secondary_swell_direction": null
        }
      };

      return _ballparks2.default.all().map(function (park) {
        var data = fakeData;
        _cache[park.id] = fakeData;
        return _extends({}, park, {
          weather: data
        });
      });
    }
  }]);

  return BallparksWeatherService;
}();

exports.default = BallparksWeatherService;