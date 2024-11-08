import { useState, useEffect } from "react" 
import axios from "axios" 
import OneCountry from "./components/OneCountry" 
import Coincidences from "./components/Coincidences" 

const App = () => {
  const [fullList, setFullList] = useState([]) 
  const [value, setValue] = useState("") 
  const [filteredCountries, setFilteredCountries] = useState([]) 
  const [selectedCountry, setSelectedCountry] = useState(null)  //guarda uno solo

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setFullList(response.data) 
      }) 
  }, []) 

  useEffect(() => {
    if (value) {
      const filtered = fullList.filter((country) =>
        country.name.common.toLowerCase().includes(value.toLowerCase())
      ) 
      setFilteredCountries(filtered) 
      if (filtered.length === 1) {
        setSelectedCountry(filtered[0]) 
      } else {
        setSelectedCountry(null) 
      }
    } else {
      setFilteredCountries([]) 
      setSelectedCountry(null) 
    }
  }, [value, fullList]) 

  const handleChange = (event) => {
    setValue(event.target.value) 
    setSelectedCountry(null)  
  } 

  const handleShowCountry = (country) => {
    setSelectedCountry(country) 
  } 

  return (
    <>
      find countries <input value={value} onChange={handleChange} />{" "}
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : selectedCountry ? (
        <OneCountry country={selectedCountry} />
      ) : (
        <Coincidences results={filteredCountries} onShowCountry={handleShowCountry} />
      )}
    </>
  ) 
} 

export default App 