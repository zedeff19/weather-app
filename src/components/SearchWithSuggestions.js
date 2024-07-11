import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { LoadScript } from '@react-google-maps/api';

const libraries = ["places"];
const API_KEY = 'AIzaSyBbGpIaB6Cr_u7dqqYbUzQfjoAvG9cOIgE'; // Replace with your actual API key

const SearchWithSuggestions = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleInputChange = async (event, newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue) {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
        params: {
          input: newInputValue,
          key: API_KEY,
          types: '(cities)'
        }
      });
      const predictions = response.data.predictions.map(prediction => ({
        description: prediction.description,
        place_id: prediction.place_id,
      }));
      setSuggestions(predictions);
    } else {
      setSuggestions([]);
    }
  };

  const handlePlaceSelect = async (event, value) => {
    setSelectedPlace(value);
    if (value) {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
          place_id: value.place_id,
          key: API_KEY,
        }
      });
      const placeDetails = response.data.result;
      console.log(placeDetails);
    }
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={handleInputChange}
        options={suggestions}
        getOptionLabel={(option) => option.description}
        onChange={handlePlaceSelect}
        renderInput={(params) => (
          <TextField {...params} label="Search places" variant="outlined" fullWidth />
        )}
      />
    </LoadScript>
  );
};

export default SearchWithSuggestions;
