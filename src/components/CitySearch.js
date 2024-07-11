import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CitySearch = ({ onSelectCity }) => {
  const [inputValue, setInputValue] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setInputValue(query);

    if (query.trim() === '') {
      setCitySuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=8aa073410f634068929fa0b915a64a35&limit=5&pretty=1`
      );

      if (response.data.results) {
        const suggestions = response.data.results.map(result => result.components.city);
        setCitySuggestions(suggestions);
      } else {
        setCitySuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setCitySuggestions([]);
    }
  };

  const handleCitySelect = (city) => {
    onSelectCity(city);
    setInputValue(city); // Update input value with selected city
    setCitySuggestions([]); // Clear suggestions
  };

  return (
    <Autocomplete
      value={inputValue}
      onChange={(e, value) => handleCitySelect(value)}
      inputValue={inputValue}
      onInputChange={(e, value) => handleInputChange(e)}
      options={citySuggestions}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search a city"
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default CitySearch;
