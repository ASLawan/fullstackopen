/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      Find countries:{" "}
      <input
        type="text"
        placeholder="Country name..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

const Country = ({ country }) => {
  // console.log("Country component", country);

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_API_KEY;
    const capital = country.capital[0];
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;

    axios
      .get(weatherAPIUrl)
      .then((response) => setWeather(response.data))
      .catch((error) => console.log("Unable to get weather data", error));
  }, [country]);
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>

      <h4>Language(s):</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p>
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          width="200"
        />
      </p>
      <p>
        {weather !== null ? (
          <div>
            <h3>Weather in {country.capital[0]}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={`Weather icon for ${weather.weather[0].description}`}
            />
          </div>
        ) : (
          ""
        )}
      </p>
    </>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryObj, setShowCountryObj] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          // console.log(response.data);
          const filteredCountries = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setCountries(filteredCountries);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setCountries([]);
    }
  }, [searchTerm]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowCountryObj(null);
  };

  // show info
  const showInfo = (name) => {
    const targetCountry = countries.find(
      (country) => country.name.common === name
    );
    // console.log(targetCountry);
    setShowCountryObj(targetCountry);
  };

  // console.log("CountryName:", countryObj);
  return (
    <div>
      <h1>Country Information</h1>
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />

      {countries.length > 10 ? (
        <p>Too many matches, please specify your search.</p>
      ) : countries.length > 1 ? (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => showInfo(country.name.common)}>
                show
              </button>
            </li>
          ))}
        </ul>
      ) : countries.length === 1 ? (
        <div>
          <Country country={countries[0]} />
        </div>
      ) : (
        <p>No matches found.</p>
      )}

      <div>{countryObj !== null ? <Country country={countryObj} /> : ""}</div>
    </div>
  );
}

export default App;
