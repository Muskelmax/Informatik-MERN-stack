import bt1 from '../assets/bigTree/st1.png'
import bt2 from '../assets/bigTree/st2.png'
import bt3 from '../assets/bigTree/st3.png'
import bt4 from '../assets/bigTree/st4.png'
import bt5 from '../assets/bigTree/st5.png'
import lt1 from '../assets/littleTree/lt1.png'
import lt2 from '../assets/littleTree/lt2.png'
import lt3 from '../assets/littleTree/lt3.png'
import lt4 from '../assets/littleTree/lt4.png'
import lt5 from '../assets/littleTree/lt5.png'
import b1 from '../assets/flower/b1.png'
import b2 from '../assets/flower/b2.png'
import b3 from '../assets/flower/b3.png'
import b4 from '../assets/flower/b4.png'
import b5 from '../assets/flower/b5.png'
import grass from '../assets/grass.png'
import './scene.css'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getActivites } from '../redux/slices/activitySlice'
import { Link } from 'react-router-dom'
import Plant from './plant.jsx'
import PlantModal from '../popUp/plantModal.jsx'
import '../popUp/plantModal.css'

function Scene() {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch();
  const activities = useSelector(state => state.activities.activities)
  const showModal = useSelector(state => state.showModal.showModal)
  const modalId = useSelector(state => state.showModal.modalId)
  const unixCurrentDate = new Date().getTime();
  useEffect(() =>{
    const intervalId = setInterval(() => {
    setCurrentTime(new Date().getTime());
    }, 1000);
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/activity');
        dispatch(getActivites(response.data));
        
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
      
    }
    fetchData();
    //useEffects returnet function, bliver kørt, når componenten er nede, her bliver intervallet altså stoppet
    return () => clearInterval(intervalId);
  }, [])
  return (
    <div className="scene">
      <div>
        <img src={grass} className='sceneGrass'></img>
      </div>
      <Link to="/ny" className="button">+</Link>
      {loading ? (
        <h1>Hello</h1>
        
      ) : (
        <div>
          {activities.map((activity) => {
            const inputDate = new Date(activity.startDate)
            const unixDate = inputDate.getTime();
            const unixTimeLeft = activity.duration - (parseInt(unixCurrentDate.toString())-parseInt(unixDate.toString()));
            
            if (activity.duration < 1800000) {
              if (unixTimeLeft/activity.duration > 0.75) {
                return(
                  <Plant x={activity.x} picture={b1} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0.5) {
                return(
                  <Plant x={activity.x} picture={b2} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0.25) {
                return(
                  <Plant x={activity.x} picture={b3} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0) {
                return(
                  <Plant x={activity.x} picture={b4} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else {
                return(
                  <Plant x={activity.x} picture={b5} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              
            }else if (activity.duration >= 1800000 && activity.duration < 43200000) {
              if (unixTimeLeft/activity.duration > 0.75) {
                return(
                  <Plant x={activity.x} picture={lt1} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0.5) {
                return(
                  <Plant x={activity.x} picture={lt2} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0.25) {
                return(
                  <Plant x={activity.x} picture={lt3} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0) {
                return(
                  <Plant x={activity.x} picture={lt4} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else {
                return(
                  <Plant x={activity.x} picture={lt5} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
            }else if (activity.duration >= 43200000) {
              if (unixTimeLeft/activity.duration > 0.75) {
                return(
                  <Plant x={activity.x} picture={bt1} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0.5) {
                return(
                  <Plant x={activity.x} picture={bt2} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0.25) {
                return(
                  <Plant x={activity.x} picture={bt3} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else if (unixTimeLeft/activity.duration > 0) {
                return(
                  <Plant x={activity.x} picture={bt4} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
              else {
                return(
                  <Plant x={activity.x} picture={bt5} unixTimeLeft={unixTimeLeft} plantId={activity.id}/>
                )
              }
            }else {
              return(
                <h1>Error</h1>
              )
            }           
          })}
        </div>
        
      )}
      {
        showModal ? (
          <div>
            <PlantModal activity={activities.find(activity => activity.id == modalId)} />
          </div>
        ) : (
          <div>
            <h1></h1>
          </div>
        )
      }
    </div>
  
    
  )
}

export default Scene
