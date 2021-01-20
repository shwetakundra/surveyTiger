import {Button} from 'reactstrap';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';

function TakeSurvey(){
  const surveyIDs=useSelector((globalStore)=>globalStore.surveys.filter(s=>s.isPublished).map((s)=>s.surveyId));
  return (
      <>
      {surveyIDs.map((surveyId)=>(
        <Button className='survey-main-btn' key={surveyId}>
          Take Survey{surveyId}
        </Button>
      ))}
    </>
  );  
}
      


export default TakeSurvey;