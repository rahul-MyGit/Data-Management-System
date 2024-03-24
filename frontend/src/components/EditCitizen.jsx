import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';

const EditCitizen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCitizen = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/citizens/${id}`);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setDob(response.data.dob);
        setGender(response.data.gender);
        setAddress(response.data.address);
        setCity(response.data.city);
        setState(response.data.state);
        setPincode(response.data.pincode);
        console.log(city);
      } catch (error) {
        console.error('Error fetching citizen:', error);
      }
    };

    getCitizen();
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/citizens/${id}`, {
        firstName,
        lastName,
        dob,
        gender,
        address,
        city,
        state,
        pincode
      });
      navigate('/list');
    } catch (error) {
      console.error('Error updating citizen:', error);
    }
  };

  return (
    <div>
      <h1>Edit Citizen</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
         <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={e => setGender(e.target.value)}
      />
      <input
      type="text"
      placeholder="Address"
      value={address}
      onChange={e => setAddress(e.target.value)}
    />
     <input
      type="text"
      placeholder="Date of birth"
      value={dob}
      onChange={e => setDob(e.target.value)}
    />
    <input
      type="text"
      placeholder="City"
      value={city}
      onChange={e => setCity(e.target.value)}
    />
    <input
      type="text"
      placeholder="State"
      value={state}
      onChange={e => setState(e.target.value)}
    />
    <input
    type="text"
    placeholder="Pincode"
    value={pincode}
    onChange={e => setPincode(e.target.value)}
  />
        
        <button type="submit" >Add Citizen</button>
      </form>
    </div>
  );
};

export default EditCitizen;