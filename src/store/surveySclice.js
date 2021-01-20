import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
export const createSurvey = createAsyncThunk(
  'surveys/createSurvey',
  async (_, thunkAPI) => {
    const newSurveyId = String(thunkAPI.getState().surveys.length+1);
    return newSurveyId
  }
)
export const surveySclice=createSlice({
    name: 'surveys',
    initialState: [],
    reducers: {
      addQuestion: (state,action)=>{
        const {surveyId,type,options,question}=action.payload;
        const q=state.find((s)=>s.surveyId===surveyId).questions;
        const qId=String(q.length+1);
        q.push({
          qId,
          type,
          question,
          options,
        });
      },
      markPublished: (state,action)=>{
        const {surveyId}=action.payload;
        state.find((s)=>s.surveyId===surveyId).isPublished=true;
      }
    },
    extraReducers: {
      [createSurvey.fulfilled]:(state,action)=>{
          state.push({questions: [],surveyId: action.payload, isPublished: false});
      }
    }
  })
  export default surveySclice;