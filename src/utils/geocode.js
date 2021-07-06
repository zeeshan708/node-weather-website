const request = require('postman-request')

const geoCode = (address, callBack) => {
    geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiemFzZ2hhciIsImEiOiJja3FtMjdwOXUwOWdqMm5vOGJ3cDMyM2lyIn0.iDbInHHFzpphMbQva50WHQ&limit=1";
    request({ url: geoCodeUrl, json: true }, function (error, response, body) {
        if (error) {
            callBack('Unable to connect to weather service:', undefined); // Print the error if one occurred
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } 
        else if (body.error) {
            callBack('Unable to fetech weather', undefined);
        }
        else {
            callBack(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
};

module.exports = geoCode;