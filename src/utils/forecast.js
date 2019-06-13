const request = require("request")

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/ff1123d3044ce81ffa6d53924ba05523/" +
    lat +
    "," +
    long;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("error from api",undefined);
    } else {
      callback(undefined,
        body.daily.data[0].summary +
          "It is currently " +
          body.currently.temperature +
          " degree out. There is a 0% chance of rain.High\
          Temperature today is:"+body.daily.data[0].temperatureHigh+
          "and low Temperature is:" + body.daily.data[0].temperatureLow
      )
    }
  })
}

module.exports = forecast
