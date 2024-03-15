import React from 'react'
import { useState } from 'react'
import './PopUp.css'
import axios from 'axios';
import { addActivity } from '../redux/slices/activitySlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PopUp() {

  const [name, setName] = useState();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const duration = parseInt(minutes) * 60000 + parseInt(hours) * 3600000 + parseInt(days) * 86400000;
    const x = Math.floor(Math.random() * 100)
    console.log(`Name: ${name} UNIX-duration: ${duration} random-x: ${x}`)
    try {
      const response = await axios.post('http://localhost:5000/activity', {name, duration, x});
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="border">
      <h1 className="header">Ny aktivitet</h1>
      <form onSubmit={handleSubmit}>
        <h2 className='subhead'>Navn:</h2>
        <input type="text" className="A-navn" placeholder="Skriv her" onChange={(e) => setName(e.target.value)}/>
        <h2 className='subhead'>Tid:</h2>
        <div className="time-selector">
          <input type="number" className="time-input" placeholder="dage" value={days} onChange={(e) => setDays(e.target.value)}/>
          <p className='timeMetric'>d : </p>
          <input type="number" className="time-input" placeholder="timer" value={hours} onChange={(e) => setHours(e.target.value)}/>
          <p className='timeMetric'>h : </p>
          <input type="number" className="time-input" placeholder="min." value={minutes} onChange={(e) => setMinutes(e.target.value)}/>
          <p className='timeMetric'>m : </p>
        </div>
        <input type="submit" value="Færdig" className="submit"/>
      </form>
    </div>
  );
}

export default PopUp