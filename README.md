#rx-ballpark-services

Simple set of services used to fetch basic information and weather data about Major Baseball Parks.

Weather Data is provided by Weather Company Data for IBM Bluemix

## Usage

###Initialize
```
import RxBaseballServices from 'rx-baseball-services';

const rbs = RxBaseballServices({
  weather: {
    apiRoot: <bluemix-weather-api-url>
  }
});
```

###Initialize (try mode)
*Bluemix account 'not required'*

*Weather Company Data for IBM Bluemix 'not required'*


```import RxBaseballServices from 'rx-baseball-services';

const rbs = RxBaseballServices({
  weather: {
    apiRoot: 'dummy',
    useMockData: true
  }
});
```

## Apis
### Fetch all ballparks with Weather

```
BaseballServices.BallparksWeatherService
      .all()
      .subscribe(r => /* do something */, /* handle error */);
```
### Fetch a ballpark by id

```
BaseballServices.BallparksService
  .byId(req.params.id)
  .subscribe(r => /* do something */, /* handle error */);
```
