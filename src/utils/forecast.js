const request = require('postman-request');

const forecast = (latitude,longitude, callBack) => {
    const url = "http://api.weatherstack.com/current?access_key=1a79291c4177744aa3714bffab5489ed&query="+latitude+","+longitude+"&units=m";
    request({ url, json: true }, function (error, response, body) {
        if (error) {
            callBack('Unable to connect to weather service:', undefined); // Print the error if one occurred
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callBack(undefined, {
                temperature: body.current.temperature,
                unit: body.request.unit,
                precip: body.current.precip
            })
        }

    })
}
module.exports = forecast;