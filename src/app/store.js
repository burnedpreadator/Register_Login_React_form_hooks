import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'

export default configureStore({
    reducer:{
        user: userReducer,
    }
})