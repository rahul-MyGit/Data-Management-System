import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function CitizenList(){
  const [citizens, setCitizens] = useState([]);
  useEffect(() => {
    getCitizens();
  }, []);

  const getCitizens = async () => {
    try {
      const response = await axios.get('http://localhost:8000/citizens');
      setCitizens(response.data);
    } catch (error) {
      console.error('Error fetching citizens:', error);
    }
  };
  const navigae = useNavigate();

  const handleClick = () => {
    navigae('/')
  }

  return (
    <div>
      <h1>List of Citizens</h1>
      <ul>
        {citizens.map(citizen => (
          <li key={citizen.id}>
            <Link to={`/option/${citizen.id}`}>
              {citizen.firstName} {citizen.lastName}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Go back to Home</button>
    </div>
  );
};

export default CitizenList