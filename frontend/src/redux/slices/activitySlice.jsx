import {createSlice} from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activities: []
  },
  reducers: {
    //get activities from database
    getActivites: (state, action) => {
      state.activities = action.payload.data.map((activity) => {
        
        return {id: activity._id, name: activity.name, x: activity.x, duration: activity.duration, startDate: activity.createdAt }
      })
    },
    addActivity : (state, action) => {
      state.activities.push(action.payload)
    },
    deleteActivity : (state, action) => {
      let stateCopy = 
      state.activities = state.activities.filter(activity => activity.id != action.payload)
      console.log(state)
    }
  }
})

export const { getActivites, addActivity, deleteActivity } = activitySlice.actions;
export default activitySlice.reducer