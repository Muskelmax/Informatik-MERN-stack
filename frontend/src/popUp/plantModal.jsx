import React from 'react'
import './plantModal.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';
import axios from 'axios';
import { deleteActivity } from '../redux/slices/activitySlice';


function PlantModal(props) {
  const startTime = new Date(props.activity.startDate).getTime();
  const unixCurrentDate = new Date().getTime();
  function formatUnixTime(unixTime) {
    if (unixTime > 0) {
      const milliseconds = unixTime;
      const dateObject = new Date(milliseconds);
      const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
      const hours = dateObject.getUTCHours();
      const minutes = dateObject.getUTCMinutes();
      const seconds = dateObject.getUTCSeconds();
  
      return `${days} : ${hours} : ${minutes} : ${seconds}`;
    }
    else {
      return 'færdig'
    }
    
  }
  const dispatch = useDispatch();
  const closeHandlder = () => {
    dispatch(closeModal());
  }
  const handleSlet = async () => {
    try {
      const response = await axios.delete(`https://informatik-mern-stack-1.onrender.com/activity/${props.activity.id}`)
      console.log(response);
      dispatch(deleteActivity(props.activity.id));
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(closeModal());
    }
    
  }
  return (
    <div className="modalBox">
      <div className='modalHead'>
        <h1 className='modalTitle'>{props.activity.name}</h1>
        <button className='modalCloseButton' onClick={closeHandlder}>x</button>
      </div>
      <div className=''>
        <h2 className='modalSubTitle'>Tid tilbage:</h2>
        <h2 className='modalTid'>{formatUnixTime(props.activity.duration - (parseInt(unixCurrentDate.toString())-parseInt(startTime.toString())))}</h2>
        <div className='modalButooDiv'> 
          <button className='sletKnap' onClick={handleSlet}>Slet</button>
        </div>
      </div>
    </div>
  )
}

export default PlantModal