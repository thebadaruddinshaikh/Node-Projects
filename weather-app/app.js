const request = require("request");
const { argv } = require("yargs");
const location = argv.location;
let mapboxAPIKey; //use your mapbox API Key
let weatherstackAPIKey; //use your weatherstack API Key

const getWeather = (callback) => {
	const GeoCoordUrl =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(location) +
		".json?access_token=" +
		mapboxAPIKey +
		"pk.eyJ1IjoidGhlYmFkYXJ1ZGRpbnNoYWlraCIsImEiOiJja2YyYnY1ZG8xMWVtMnpxZHQza2dvYzRnIn0.nJdygfGY84IBMHWLe745VA&limit=1";

	request({ url: GeoCoordUrl, json: true }, (err, res) => {
		if (err) {
			callback("Unable to connect with the servers", undefined);
		} else if (res.body.features.length == 0) {
			callback("Unable to find Location, Try Another Search", undefined);
		} else {
			let latitude = res.body.features[0].center[1];
			let longitude = res.body.features[0].center[0];
			request(
				{
					url:
						"http://api.weatherstack.com/current?access_key=" +
						weatherstackAPIKey +
						"ac3e9ee91f229d1fb37a4bce4d581f02&units=s&query=" +
						latitude +
						"," +
						longitude,
					json: true,
				},
				(err, res) => {
					if (err) {
						callback("Unable to connect with the servers", undefined);
					} else if (res.body.current.length == 0) {
						callback("Unable to find Location, Try Another Search", undefined);
					} else {
						callback(undefined, {
							place: res.body.location.name,
							region: res.body.location.region,
							country: res.body.location.country,
							time: res.body.location.localtime,
							temp: res.body.current.temperature,
							wind_speed: res.body.current.wind_speed,
							wind_degree: res.body.current.wind_degree,
							wind_dir: res.body.current.wind_dir,
							pressure: res.body.current.pressure,
							precip: res.body.current.precip,
							humidity: res.body.current.humidity,
							cloudcover: res.body.current.cloudcover,
							feelslike: res.body.current.feelslike,
							uv_index: res.body.current.uv_index,
							visibility: res.body.current.visibility,
							is_day: res.body.current.visibility,
						});
					}
				}
			);
		}
	});
};

getWeather((err, data) => {
	if (err) console.log(err);
	console.log(data);
});
