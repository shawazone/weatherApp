import "./App.css";
import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
const api = {
  key: "e6e93798493efd31248c956d259facf1",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");

  const handleSelect = async (value) => {
    search(value);
  };

  const search = async (value) => {
    try {
      const response = await fetch(
        `${api.base}weather?q=${value}&units=metric&APPID=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");

         

          if (result.weather[0].main === "Clear") {
            console.log("Clear");
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-512.png"
            );
          } else if (result.weather[0].main === "Drizzle") {
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-30-512.png"
            );
          } else if (result.weather[0].main === "Clouds") {
            console.log("uwu");
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-22-512.png"
            );
          } else if (result.weather[0].main === "Sunny") {
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-512.png"
            );
          } else if (result.weather[0].main === "Mist") {
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-27-512.png"
            );
          } else if (result.weather[0].main === "Rain") {
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-32-512.png"
            );
          } else if (result.weather[0].main === "Haze") {
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-27-512.png"
            );
          } else if (result.weather[0].main === "Thunderstorm") {
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-23-512.png"
            );
          } else if (result.weather[0].main === "Snow") {
            setWeatherIcon(
              "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-512.png"
            );
          } else if (result.weather[0].main === "Response"){
            console.log(response);    
          }
        });
    } catch (error) {}
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year} `;
  };

  const searchOptions = {
    types: ["(cities)"],
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp <= 7
            ? "app cold"
            : weather.main.temp > 7 && weather.main.temp <= 16
            ? "app cool"
            : weather.main.temp > 16 && weather.main.temp < 25
            ? "app warm"
            : weather.main.temp >= 25
            ? "app hot"
            : "app"
          : "app"
      }
    >
      <main>
        
        <div className="search-box">
          <PlacesAutocomplete
            value={query}
            onChange={setQuery}
            onSelect={handleSelect}
            searchOptions={searchOptions}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({ placeholder: "Type address" })}
                  className="search-bar"
                />
                <div>
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };

                    return (
                      <div
                        className="search-suggestion"
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>

          <image></image>
        </div>
        
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              {/* <div className='date'>{weather.name}</div> */}
              <div className="location">{weather.weather[0].main}</div>
              <img
                src={weatherIcon}
                alt="Double Cloud Icon"
                style={{ width: "150px", height: "150px", opacity: 0.8 }}
              />
            </div>
            <div className="weather-box">
              <div className="temp"> {Math.round(weather.main.temp)}°c </div>
            </div>
          </div>
        ) : !query ? (
          <div className="chooseAcity">
            <div className="weather-box2">
              <div className="temperory">please choose a city</div>
            </div>
          </div>
        ) : typeof weather.main === "undefined" ? (
          <div>
            <div className="weather-box2">
              <div className="temperory">city does not exist</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

// "weather":
// [  {   "id":800,
//       "main":"Clear",
//       "description":"clear sky",
//       "icon":"02n"}],

//        "clouds":{"all":8},
//        "wind":{"speed":4.77,"deg":232.505},
//        "snow":{},
//        "sys":{"pod":"n"},
//        "dt_txt":"2017-01-30 18:00:00" },

// {           "dt":1485810000,

// "main":{  "temp":261.41,
//           "temp_min":259.638,
//           "temp_max":261.41,
//           "pressure":1022.41,
//           "sea_level":1044.35,
//           "grnd_level":1022.41,
//           "humidity":76,
//           "temp_kf":1.78}

// "weather":
//         [{"  id":803,
//             "main":"Clouds",
//             "description":"broken clouds",
//             "icon":"04n"}],

//         "clouds":{"all":56},
//         "wind":{"speed":2.47,"deg":180.501},
//         "snow":{},
//         "sys":{"pod":"n"},
//         "dt_txt":"2017-02-04 15:00:00"}],

//         "city":{ "id":524901,
//                   "name":"Moscow",
//                   "coord":{"lat":55.7522,"lon":37.6156},
//                   "country":"none"}}

// "weather":
//      [{"id":800,
//        "main":"Clear",
//        "description":"clear sky",
//        "icon":"01d"}],

//      "clouds":{"all":76},
//      "wind":{"speed":2.32,"deg":175.001},
//      "snow":{"3h":0.0049999999999999},
//      "sys":{"pod":"d"},
//      "dt_txt":"2017-02-04 12:00:00"},

//      {"dt":1486220400,
//      "main":{ "temp":260.26,
//               "temp_min":260.26,
//               "temp_max":260.26,
//               "pressure":1021,
//               "sea_level":1042.96,
//               "grnd_level":1021,
//               "humidity":86,
//               "temp_kf":0},
