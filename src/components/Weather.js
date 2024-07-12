import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
//icons import
import ThermostatTwoToneIcon from '@mui/icons-material/ThermostatTwoTone';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
//
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Forecast from './Forecast';
import WeatherComponent from './WeatherComponent';
import Charts from './Charts';
import Header from './Header';
import { auth } from './firebase';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { arrayUnion, updateDoc } from 'firebase/firestore';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#1976d2',
    },
    body1: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  //set z index to 100
  
});

const Weather = () => {
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [temps, setTemps] = useState([12, 14, 16, 18, 14]);
  const [dates, setDates] = useState(['2022-10-10', '2022-10-11', '2022-10-12', '2022-10-13', '2022-10-14']);
  const API_KEY = '41f6250616c8fb4ddbebed59a001b6e1';
  const [userDetails, setUserDetails] = useState(null);
  const [Favourites, setFavourites] = useState([ ]); 


  

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setTemps(response.data.list.filter((item) => item.dt_txt.endsWith("12:00:00")).map((item) => item.main.temp));
      setDates(response.data.list.filter((item) => item.dt_txt.endsWith("12:00:00")).map((item) => item.dt_txt.split(' ')[0]));
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []); // Call fetchWeather only once when the component mounts


  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          if (docSnap.data().favorites) {
            setFavourites(docSnap.data().favorites); // Update local state with favorites from Firestore
          }
        } else {
          console.log("User data not found");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };
  
  

  useEffect(() => {
    fetchUserData();
  }, []);


  const addFavoriteToDB = async (cityName) => {
    if (!Favourites.includes(cityName)) {
      try {
        const userDocRef = doc(db, 'Users', auth.currentUser.uid);
        await updateDoc(userDocRef, {
          favorites: arrayUnion(cityName)
        });
        setFavourites(prevFavourites => [...prevFavourites, cityName]); // Update local state
        console.log('Favorite added successfully!');
      } catch (error) {
        console.error('Error adding favorite:', error);
        // Handle error as needed
      }
    }
  };
  
  


  function addFavourite(city) {
    if (!Favourites.includes(city)) {
      setFavourites(prevFavourites => [...prevFavourites, city]); // Update local state optimistically
      addFavoriteToDB(city); // Add the city to the database
    }
  }
  

  function handleFavouriteClick(city) {
    setCity(city);
    fetchWeather();
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      // setFavourites([]);
      // setUserDetails(null);
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header handleLogout= {handleLogout} />


      <div className="py-6 flex flex-col items-center" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

        {userDetails &&
          <Typography variant='h5' gutterBottom>
            hi there {userDetails.firstName}
          </Typography>
        }
        <br></br>

        

        <div className="search-container w-full max-w-md px-6 flex flex-col items-center" style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          
          {loading ? (
            <CircularProgress />
          ) : (
            <WeatherComponent weatherType={weather?.list[0].weather[0].main} className='my-4' />
          )}

          <TextField
            id="outlined-basic"
            label="Search a city"
            variant="outlined"
            value={city}
            fullWidth
            onChange={(e) => setCity(e.target.value)}
            sx={{ mb: '1rem', mt: '1rem' }}
          />
          <Button
            variant="contained"
            onClick={fetchWeather}
            fullWidth
            sx={{ mb: '1rem' }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            onClick={() => addFavourite(city)}
            fullWidth
            sx={{
              mb: '1rem',
              backgroundColor: '#f50057',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#c51162', // Darker version of #f50057
              },
            }}
          >
  <FavoriteRoundedIcon /> Add to Favourites
</Button>


          {city === '' && <Alert severity="info">Please enter a city name</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            weather && (
              <Card
                variant="outlined"
                className="mt-2 flex w-full flex-col place-items-center text-center rounded-lg my-2"
                sx={{ backgroundColor: 'transparent', border: 'none' }}
              >
                <CardContent className="w-full flex flex-col place-items-center rounded-lg my-5 text-left">
                  <Typography variant="h5" component="div" gutterBottom>
                    {weather.list[0].main.temp}°C
                  </Typography>
                  <Typography variant="body1" component="div">
                    <ThermostatTwoToneIcon sx={{ color: "red" }} />: {weather.list[0].main.temp}°C
                  </Typography>
                  <Typography variant="body1" component="div">
                    Humidity: {weather.list[0].main.humidity}%
                  </Typography>
                  <Typography variant="body1" component="div">
                    Condition: {weather.list[0].weather[0].description}
                  </Typography>
                  <Typography variant="body1" component="div">
                    Pressure: {weather.list[0].main.pressure} hPa
                  </Typography>
                  <Typography variant="body1" component="div">
                    Category: {weather.list[0].weather[0].main}
                  </Typography>
                </CardContent>
              </Card>
            )
          )}

          {/* {weather && (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Weather information for {city}
              </Typography>
            </Box>
          )} */}
        </div>
        
        <div className="search-container mt-12 w-full max-w-md px-6 flex flex-col items-center" style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '600px' }}>
            <Typography variant='h5' gutterBottom>
              Favourite Cities
            </Typography>

            {Favourites.length===0  ?
              <Typography variant='body1' gutterBottom>
                No favourite cities added
              </Typography>
              : (
            Favourites.map((favCity, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleFavouriteClick(favCity)}
                sx={{ textTransform: 'none', my: '0.5rem' }}
              >
                {favCity}
              </Button>
            ))
          )}
        </div>

        {/* <FavouritesComp Favourites={Favourites} City={city} setCity={setCity} fetchWeather={fetchWeather} />   */}

        {weather && <Forecast weather={weather} city={city} error={error} />}
        {weather && <Charts temps={temps} dates={dates} />}
      </div>

      {/* <FavouritesComp
        Favourites={Favourites} 
        City={city}
        setCity={setCity}
        fetchWeather={fetchWeather}
        
      /> */}
    </ThemeProvider>
  );
};

export default Weather;
