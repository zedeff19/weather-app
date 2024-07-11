import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ temps, dates }) => {
  const minDataPoint = Math.min(...temps);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Daily Temperature',
        data: temps,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to resize based on container dimensions
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Roboto',
            weight: 'bold',
          },
          color: '#333',
        },
      },
      title: {
        text: 'Temperature trends over the day',
        font: {
          size: 18,
          family: 'Arial',
          weight: 'bold',
        },
        color: '#333',
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 16,
          family: 'Arial',
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
          family: 'Arial',
        },
        cornerRadius: 5,
        caretSize: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days',
          color: '#333',
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold',
          },
        },
        ticks: {
          color: '#333',
          font: {
            size: 12,
            family: 'Arial',
          },
        },
        callback: function (value, index) {
          // Skip every second tick label
          return index % 4 === 0 ? this.getLabelForValue(value) : '';
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: '#333',
          font: {
            size: 14,
            family: 'Arial',
            weight: 'bold',
          },
        },
        ticks: {
          color: '#333',
          font: {
            size: 12,
            family: 'Arial',
          },
        },
        min: minDataPoint - 5, // Set the minimum y-axis value to be a little above the minimum data point
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '90%', margin: 'auto', height: '400px', maxWidth: '600px' }}>
      <Typography variant="h5" component="div" align="center">
        Temperate prediction
      </Typography>
      <Line data={data} options={options} />
    </div>
  );
};

export default Charts;
