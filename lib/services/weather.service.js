import Rx from 'rx';
import rp from 'request-promise';

export default class WeatherService {
  constructor(config) {
    this._apiRoot = config.weather.apiRoot;
  }
  current({units, lat, lon, lang}) {
    const qs = {
      units: units || 'm',
      geocode: `${lat},${lon}`,
      language: lang || 'en-US'
    };

    return Rx.Observable.fromPromise(rp({
      method: 'GET',
      uri: `${this._apiRoot}/api/weather/v2/observations/current`,
      qs,
      json: true
    }));
  }
}
