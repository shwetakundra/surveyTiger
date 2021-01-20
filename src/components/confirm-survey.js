import {Button} from 'reactstrap';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {surveySclice} from '../store/surveySclice'
import {useDispatch} from 'react-redux';

function ConfirmSurvey(){
    const {surveyId}=useParams();
    const dispatch=useDispatch();
    const history=useHistory();
  const survey=useSelector((globalStore)=>globalStore.surveys.find((s)=>s.surveyId===surveyId));
  const confirmAndPublishSurvey=()=>{
      dispatch(surveySclice.actions.markPublished({surveyId}));
      history.push("/")

  }
  return (
      <>
      {survey.questions.map((q)=>(
      <>
      <h4>{q.question}</h4>
      {q.type==="single"?(
          <>
          <label>{q.options[0]}</label>
          <input type="radio"/>
          <label>{q.options[1]}</label>
          <input type="radio"/>
          </>
      ):(
          <>
          <label>{q.options[0]}</label>
          <input type="checkbox"/>
          <label>{q.options[1]}</label>
          <input type="checkbox"/>
          <label>{q.options[2]}</label>
          <input type="checkbox"/>
          <label>{q.options[3]}</label>
          <input type="checkbox"/>
      </>
    )}
    </>
      ))}
        <Button className='survey-main-btn' style={{backgroundColor:"#af5f46"}}onClick={confirmAndPublishSurvey}>
         confirm survey
        </Button>
    </>
  );  
}
      


export default ConfirmSurvey;