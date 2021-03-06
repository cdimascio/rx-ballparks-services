
import BallparksService from './services/ballparks.service';
import BallparksWeatherService from './services/ballparks.weather.service';
import DbPediaService from './services/dbpedia.service';
import WeatherService from './services/weather.service';

module.exports = function RxBaseballServices(config) {
  console.log('CONFIG',config);
  const weatherService = new WeatherService(config);
  return {
    BallparksService,
    BallparksWeatherService: new BallparksWeatherService(config, weatherService),
    WeatherService: weatherService,
    DbPediaService
  };
};