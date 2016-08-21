#rx-ballpark-services

Simple set of services used to fetch basic information and weather data about Major Baseball Parks.

Weather Data is provided by Weather Company Data for IBM Bluemix

## Usage

###Initialize

```
import RxBallparkServices from 'rx-ballpark-services';

const rbs = RxBallparkServices({
  weather: {
    apiRoot: <bluemix-weather-api-url>
  }
});
```

###Initialize (try mode)

*Bluemix account 'not required'*

*Weather Company Data for IBM Bluemix 'not required'*


```
import RxBallparkServices from 'rx-ballpark-services';

const rbs = RxBallparkServices({
  weather: {
    apiRoot: 'dummy',
    useMockData: true
  }
});
```

## Apis

### Fetch all ballparks with Weather

```
rbs.BallparksWeatherService
      .all()
      .subscribe(r => /* do something */, /* handle error */);
```

### Fetch a ballpark by id

```
rbs.BallparksService
  .byId(req.params.id)
  .subscribe(r => /* do something */, /* handle error */);
```
