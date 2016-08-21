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

var _weather = require('./weather.service');

var _weather2 = _interopRequireDefault(_weather);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INTERVAL = 1000 * 60 * 60 * 1.5;

var _cache = {};

var BallparksWeatherService = function () {
  function BallparksWeatherService(config) {
    _classCallCheck(this, BallparksWeatherService);

    this._useMockData = config.weather && config.weather.useMockData;
    console.log('USE MOCK DATA', this._useMockData);
  }

  _createClass(BallparksWeatherService, [{
    key: 'all',
    value: function all() {
      return _ballparks2.default.all().map(function (park) {
        return _extends({}, park, { weather: _cache[park.id] });
      });
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
      console.log('update weather data');
      return _ballparks2.default.all().flatMap(function (park) {
        return _weather2.default.current({
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
      var fakeData = { metadata: { language: 'en-US',
          transaction_id: '1459776299510:666958001',
          version: '1',
          latitude: 39.91,
          longitude: -75.17,
          units: 'e',
          expire_time_gmt: 1459776899,
          status_code: 200 },
        observation: { class: 'observation',
          expire_time_gmt: 1459776899,
          obs_time: 1459775100,
          obs_time_local: '2016-04-04T09:05:00-0400',
          wdir: 330,
          icon_code: 26,
          icon_extd: 2600,
          sunrise: '2016-04-04T06:38:59-0400',
          sunset: '2016-04-04T19:28:46-0400',
          day_ind: 'D',
          uv_index: 1,
          uv_warning: 0,
          wxman: 'wx1250',
          obs_qualifier_code: null,
          ptend_code: 2,
          dow: 'Monday',
          wdir_cardinal: 'NNW',
          uv_desc: 'Low',
          phrase_12char: 'Cloudy',
          phrase_22char: 'Cloudy',
          phrase_32char: 'Cloudy',
          ptend_desc: 'Falling',
          sky_cover: 'Cloudy',
          clds: 'OVC',
          obs_qualifier_severity: null,
          vocal_key: 'OT50:OX2600',
          imperial: { wspd: 5,
            gust: null,
            vis: 10,
            mslp: 1011.8,
            altimeter: 29.88,
            temp: 50,
            dewpt: 36,
            rh: 59,
            wc: 48,
            hi: 50,
            temp_change_24hour: 12,
            temp_max_24hour: 50,
            temp_min_24hour: 37,
            pchange: -0.02,
            feels_like: 48,
            snow_1hour: 0,
            snow_6hour: 0,
            snow_24hour: 0,
            snow_mtd: 0,
            snow_season: 26.1,
            snow_ytd: 26.1,
            snow_2day: 0,
            snow_3day: 0,
            snow_7day: 0,
            ceiling: 10300,
            precip_1hour: 0,
            precip_6hour: 0,
            precip_24hour: 0,
            precip_mtd: 0.64,
            precip_ytd: 9.7,
            precip_2day: 0.16,
            precip_3day: 0.64,
            precip_7day: 0.65,
            obs_qualifier_100char: null,
            obs_qualifier_50char: null,
            obs_qualifier_32char: null } } };

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