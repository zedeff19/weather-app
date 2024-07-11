import { Typography, Container, List, ListItem, ListItemText, Paper } from '@mui/material';
import React from 'react';

const FavouritesComp = ({ Favourites, City, setCity, fetchWeather }) => {

  const handleCityClick = (cityName) => {
    setCity(cityName);
    fetchWeather();
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Favourites
      </Typography>
      <Paper elevation={3}>
        <List component="nav" aria-label="favorite cities list">
          {Favourites.map((fav, index) => (
            <ListItem button key={index} onClick={() => handleCityClick(fav)}>
              <ListItemText primary={fav} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default FavouritesComp;
