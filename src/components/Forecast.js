import React from 'react';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ThermostatTwoToneIcon from '@mui/icons-material/ThermostatTwoTone';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: '200px',
  maxWidth: '250px',
  marginBottom: '1rem',
  marginRight: '1rem',
  height: 'fit-content',
  flexShrink: 0,
  marginX: 2,
  background: 'transparent',
  borderRadius: '16px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  borderRadius: '16px',
  backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#e0f7fa',
  textAlign: 'center',
}));

const Forecast = ({ weather, city, error }) => {
  // Function to convert date-time string to date only
  const getDateFromDateText = (dateTimeText) => {
    const dateObj = new Date(dateTimeText);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Function to create weather card
  const createCard = (item) => (
    <StyledCard key={item.dt}>
      <StyledCardContent>
        <Typography variant="h5">
          {getDateFromDateText(item.dt_txt)}
        </Typography>
        {/* <Typography variant="body1">  
          Time: {item.dt_txt.split(' ')[1]}
        </Typography> */}
        <Typography variant="body1">
          <ThermostatTwoToneIcon sx={{ color: "red" }} />: {item.main.temp}°C
        </Typography>
        <Typography variant="body1">
          Humidity: {item.main.humidity}%
        </Typography>
        <Typography variant="body1">
          Condition: {item.weather[0].description}
        </Typography>
        <Typography variant="body1">
          Pressure: {item.main.pressure} hPa
        </Typography>
        {/* <Typography variant="body1">
          Data for {city}
        </Typography> */}
      </StyledCardContent>
    </StyledCard>
  );

  return (
    <Box className="w-full flex flex-col items-center py-6">
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ 
        display: 'flex', 
        overflowX: 'auto', 
        width: '70%', 
        my: 4,
        py: 2, 
        flexWrap: 'nowrap', 
        border: '1px solid black', 
        borderRadius: '8px', 
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 transparent',
        px: 2,
      }}>
        {weather && weather.list.filter(item => item.dt_txt.split(' ')[1] === '12:00:00').map((item) => createCard(item))}
      </Box>
    </Box>
  );
};

export default Forecast;
