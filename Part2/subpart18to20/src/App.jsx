/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
	// Define states
	const weatherAPIKey = import.meta.env.VITE_SOME_KEY;
	const [countries, setCountries] = useState([]); // All countries
	const [filteredCountries, setFilteredCountries] = useState([]); // Filtered countries
	const [weatherDetails, setWeatherDetails] = useState(null); // Weather details
	const [selectedCountry, setSelectedCountry] = useState(null); // Selected country

	// Fetch all countries
	const fetchCountries = async () => {
		try {
			const res = await axios.get(
				`https://studies.cs.helsinki.fi/restcountries/api/all`
			);
			setCountries(res.data);
		} catch (error) {
			console.error("Error loading countries:", error);
		}
	};

	// Fetch weather data
	const fetchWeather = async (capital, countryName) => {
		try {
			const res = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${capital},${countryName}&APPID=${weatherAPIKey}&units=metric`
			);
			setWeatherDetails(res.data);
		} catch (error) {
			console.error("Error fetching weather:", error);
		}
	};

	// Filter countries
	const filterCountries = (search) => {
		if (!search) {
			setFilteredCountries([]);
			return;
		}

		const filtered = countries.filter((c) =>
			c.name.common.toLowerCase().includes(search.toLowerCase())
		);
		setFilteredCountries(filtered);

		// Fetch weather if there's only one match
		if (filtered.length === 1) {
			const country = filtered[0];
			setSelectedCountry(country);
			fetchWeather(country.capital[0], country.name.common);
		}
	};

	// Handle input change
	const handleSearch = (event) => {
		const search = event.target.value;
		filterCountries(search);
	};

	// Handle "Show" button
	const handleShowCountry = (country) => {
		setSelectedCountry(country);
		fetchWeather(country.capital[0], country.name.common);
	};

	// Initial fetch of countries
	useEffect(() => {
		fetchCountries();
	}, []);

	return (
		<div>
			<h3>Find countries</h3>
			<input type="text" onChange={handleSearch} />

			{/* List of filtered countries */}
			<ListOfCountries
				searchingCountry={filteredCountries}
				showCountry={handleShowCountry}
			/>

			{/* Selected country and weather info */}
			{selectedCountry && (
				<SelectedCountryInfo
					country={selectedCountry}
					weather={weatherDetails}
				/>
			)}
		</div>
	);
}

export default App;

// List of Countries Component
const ListOfCountries = ({ searchingCountry, showCountry }) => {
	if (searchingCountry.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}

	return (
		<div>
			{searchingCountry.map((country) => (
				<p key={country.name.common}>
					{country.name.common}
					<button onClick={() => showCountry(country)}>Show</button>
				</p>
			))}
		</div>
	);
};

// Selected Country Info Component
const SelectedCountryInfo = ({ country, weather }) => {
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>
			<h3>Languages:</h3>
			<ul>
				{Object.values(country.languages).map((lang, index) => (
					<li key={index}>{lang}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
			<h3>Weather in {country.capital[0]}</h3>
			{weather ? (
				<div>
					<p>Temperature: {weather.main.temp} °C</p>
					<img
						src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt="Weather Icon"
					/>
					<p>Wind: {weather.wind.speed} m/s</p>					
				</div>
			) : (
				<p>Loading weather...</p>
			)}
		</div>
	);
};
