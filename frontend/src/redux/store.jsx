import {configureStore} from '@reduxjs/toolkit'
import activityReducer from './slices/activitySlice.jsx'
import modalReducer from './slices/modalSlice.jsx'

const store = configureStore({
  reducer: {
    activities: activityReducer,
    showModal: modalReducer
  }
})
export default store;