import React from "react";
import Weather from "./Weather";

const OneCountry = ({country}) => {
    console.log(country.name)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>
        <strong>Laguages:</strong>
      </p>
      <ul>
      {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
      <Weather city={country.capital}/>
    </div>
  );
};

export default OneCountry;
