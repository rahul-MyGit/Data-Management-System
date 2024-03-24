import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteCitizen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteCitizen = async () => {
      try {
        await axios.delete(`http://localhost:8000/citizens/${id}`);
        navigate('/list');
      } catch (error) {
        console.error('Error deleting citizen:', error);
      }
    };

    deleteCitizen();
  }, [id]);

  return (
    <div>
      <h1>Delete Citizen</h1>
      <p>Deleting...</p>
    </div>
  );
};

export default DeleteCitizen;