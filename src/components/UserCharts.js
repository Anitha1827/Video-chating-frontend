// import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
 import { Bar } from 'react-chartjs-2';

//http://localhost:3001/auth/users
const UserCharts = () => {
     const [userData, setUserData ] = useState([]);
     const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://video-chating-application.onrender.com/auth/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  // Prepare data for the chart
  const chartData = {
    labels: userData.map((data) => data.time),
    datasets: [
      {
        label: 'Logged-in Users',
        data: userData.map((data) => data.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  

  return (
    <div>
    <h1>Welcome to the logged-in page!</h1>
    <div style={{ width: '80%', margin: 'auto' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
    {/* Add other content for the logged-in user here */}
  </div>
  )
}

export default UserCharts
