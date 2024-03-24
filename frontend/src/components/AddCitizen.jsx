import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddCitizen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate('/');
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/citizens', {
        firstName,
        lastName,
        dob,
        gender,
        address,
        city,
        state,
        pincode
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding citizen:', error);
    }
  };

  return (
    <div>
      <h1>Add Citizen</h1>
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
        /><input
        type="text"
        placeholder="Date of birth"
        value={dob}
        onChange={e => setDob(e.target.value)}
      />
      <input
        type="text"
        placeholder="Gender"
        value={gender}
        onChange={e => setGender(e.target.value)}
      /><input
      type="text"
      placeholder="Address"
      value={address}
      onChange={e => setAddress(e.target.value)}
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
    placeholder=""
    value={pincode}
    onChange={e => setPincode(e.target.value)}
  />
        
        <button type="submit">Add Citizen</button>
      </form>

      <button type="submit" onClick={handleClick}>Go Back</button>
    </div>
  );
};

export default AddCitizen;