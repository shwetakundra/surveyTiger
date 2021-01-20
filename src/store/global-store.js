import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit';
import {surveySclice} from './surveySclice';
import {responseSclice} from './responseSclice';
const rootReducer=combineReducers({
    surveys: surveySclice.reducer,
    responses: responseSclice.reducer,
})
export const store=configureStore({reducer: rootReducer});