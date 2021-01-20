import {createSlice} from '@reduxjs/toolkit';
export const responseSclice=createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
      increment: state => state + 1,
      decrement: state => state - 1
    }
  })
  export default responseSclice;