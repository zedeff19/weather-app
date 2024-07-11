import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import {motion} from 'framer-motion';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <div className="">
      {/* <div className="flex items-center">
        <WbSunnyIcon className="text-yellow-500 " />
      </div>
      <div className="flex-grow text-center">
        <h1 className="text-3xl font-mono text-green-500">Weather App</h1>
      </div> */}

      <AppBar position="relative" >
        <Toolbar>
          <motion.div animate={{ scale: 1.2 , originX: -0.5, originY: 0.5}}>
          <WbSunnyIcon className="text-yellow-500 " animate/>
          </motion.div>
          
          <motion.Typography variant="h6" color="inherit" noWrap sx={{px:3}} 
          animate={{ scale: 1.2 , originX: -1.5, originY: -0.3}}
          >
            Weather App
          </motion.Typography>

          <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => {
            alert('clicked');
          }}
          sx={{  right: 10, position: 'absolute', marginY : 'auto', color: 'white'}}
        >
          Log Out
        </Button>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
