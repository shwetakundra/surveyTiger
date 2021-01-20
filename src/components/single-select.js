import React,{useState} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {surveySclice} from '../store/surveySclice'

import {Button} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

function SingleSelect(){
  const {surveyId}=useParams();
  const dispatch=useDispatch();
  const history=useHistory();
  const [options,setOptions]=useState(["",""]);
  const [Question,setQuestion]=useState("");

  const disabledButtonAddAndPublish=()=>   
  Question.trim()==='' || options.find((opt)=>opt.trim()==='')!==undefined;
  const setOptionInArray=(value,optionIdx)=>{
    options[optionIdx]=value;
    setOptions([...options]);
};
const addQuestion=()=>{
  const payload={
    options,
    Question,
    surveyId,
    type:"single"
  };
  dispatch(surveySclice.actions.addQuestion(payload));
  history.push('/create/' +surveyId+'?clear=true');
}
const PublishQuestion=()=>{
  const payload={
    options,
    Question,
    surveyId,
    type:"single"
  };
  dispatch(surveySclice.actions.addQuestion(payload));
  history.push('/confirm/' +surveyId);
}

    return (
    <div className="question-container">
      <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>?</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Your Question" onChange={(e)=>{setQuestion(e.target.value)}} value={Question}/>
        </InputGroup>
      <p className="inputFieldText" > Options</p>
      <InputGroup className="inputField">
      <Input placeholder="Option 1" value={options[0]} onChange={e=>{
        setOptionInArray(e.target.value,0)
        console.log(options[0]+" "+options[1])
      }} />
        <InputGroupAddon addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
        </InputGroup>
        <InputGroup className="inputField">
        <Input placeholder="Option 2" value={options[1]} onChange={e=>{
        setOptionInArray(e.target.value,1)
      }}/>
        <InputGroupAddon addonType="append">
          <InputGroupText>+</InputGroupText>
          <InputGroupText>-</InputGroupText>
        </InputGroupAddon>
        </InputGroup>
        <div className="question-single-select">
        <Button className="survey-main-btn" style={{backgroundColor:"#af5f46"}} disabled={disabledButtonAddAndPublish()} onClick={addQuestion}>Add Question</Button>
        <Button className="survey-main-btn" style={{backgroundColor:"#af5f46"}} disabled={disabledButtonAddAndPublish()} onClick={PublishQuestion}>Publish</Button>
        </div>
    </div>
    );
}
export default SingleSelect;