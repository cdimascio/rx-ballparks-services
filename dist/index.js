'use strict';

var _ballparks = require('./services/ballparks.service');

var _ballparks2 = _interopRequireDefault(_ballparks);

var _ballparksWeather = require('./services/ballparks.weather.service');

var _ballparksWeather2 = _interopRequireDefault(_ballparksWeather);

var _dbpedia = require('./services/dbpedia.service');

var _dbpedia2 = _interopRequireDefault(_dbpedia);

var _weather = require('./services/weather.service');

var _weather2 = _interopRequireDefault(_weather);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function RxBaseballServices(config) {
  console.log('CONFIG', config);
  var weatherService = new _weather2.default(config);
  return {
    BallparksService: _ballparks2.default,
    BallparksWeatherService: new _ballparksWeather2.default(config, weatherService),
    WeatherService: weatherService,
    DbPediaService: _dbpedia2.default
  };
};