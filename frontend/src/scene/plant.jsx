import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';
import './plant.css'


function Plant(props) {
  const showModal = useSelector(state => state.showModal.showModal)
  const dispatch = useDispatch();
  let containerStyle = {
    position: 'absolute',
    bottom: '153px',
    left: `${props.x}%`, 
    transform: 'translate(-50%, 0%)',
    textAlign: 'center',
  };
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
      containerStyle.bottom = '160px'
    }
    
  }
  const handleClick = () => {
    dispatch(openModal(props.plantId));
    console.log(showModal + " " + props.plantId);
  }
  return (
    <div className="plantContainer" style={containerStyle} onClick={handleClick}>
      <img className="flower" src={props.picture} ></img>
      <h1 className='timePassed' >{formatUnixTime(props.unixTimeLeft)}</h1>
    </div>
  )
}

export default Plant