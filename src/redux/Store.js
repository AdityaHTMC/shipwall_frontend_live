
import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './slice/Testslice'

 const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
})

export default store