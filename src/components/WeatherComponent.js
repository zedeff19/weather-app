import React from 'react';
import { motion } from 'framer-motion';

const WeatherComponent = ({ weatherType }) => {
  return (
    <div className='h-[175px] flex items-center justify-center'>
      {weatherType === 'Rain' || weatherType === 'Drizzle' ? (
        <div className='flex flex-row items-center justify-center w-full overflow-hidden h-[10rem] mb-10'>
          <motion.div
            initial={{ x: -50, y: 0 }}
            animate={{ x: 22 }}
            transition={{ type: 'spring', stiffness: 50 }}
            className='text-[30vw] md:text-[150px]'
          >
            🌧️
          </motion.div>
          <motion.div
            initial={{ x: 50, y: 15 }}
            animate={{ x: -25 }}
            transition={{ type: 'spring', stiffness: 50 }}
            className='text-[30vw] md:text-[150px]'
          >
            🌧️
          </motion.div>
        </div>
      ) : weatherType === 'Sunny' ? (
        <motion.div
          initial={{ y: -50, x: 0 }}
          animate={{ y: 0, x: 22 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className='text-[30vw] md:text-[150px]'
        >
          ☀️
        </motion.div>
      ) : weatherType === 'Clouds' ? (
        <div className='flex flex-row w-full overflow-hidden h-[10rem] mb-10 items-center justify-center'>
          <motion.div
            initial={{ x: -50, y: 0 }}
            animate={{ x: 22 }}
            transition={{ type: 'spring', stiffness: 50 }}
            className='text-[30vw] md:text-[150px]'
          >
            ☁️
          </motion.div>
          <motion.div
            initial={{ x: 50, y: 15 }}
            animate={{ x: -25 }}
            transition={{ type: 'spring', stiffness: 50 }}
            className='text-[30vw] md:text-[150px]'
          >
            ☁️
          </motion.div>
        </div>
      ) : weatherType === 'Clear' ? (
        <motion.div
          initial={{ y: -50, x: 0 }}
          animate={{ y: 0, x: 22 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className='text-[30vw] md:text-[150px]'
        >
          ☀️
        </motion.div>
      ) : (
        <div>
          <h2 className='text-[5vw] md:text-[20px]'>Unknown Weather</h2>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
