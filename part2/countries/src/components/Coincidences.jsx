import React from 'react';

const Coincidences = ({ results, onShowCountry }) => {
  return (
    <ul>
      {results.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShowCountry(country)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default Coincidences;