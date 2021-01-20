  
import React,{useState} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {surveySclice} from '../store/surveySclice'
import {Button} from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

function MultiSelect(){
    const [options,setOptions]=useState([""]);
    const [Question,setQuestion]=useState(""); 
    const {surveyId}=useParams();
    const dispatch=useDispatch();
    const history=useHistory();
    const addQuestion=()=>{
      const payload={
        options,
        Question,
        surveyId,
        type:"multiple"
      };
      dispatch(surveySclice.actions.addQuestion(payload));
      history.push('/create/' +surveyId+'?clear=true');
    }
    const addOption=(optionIdx)=>{
        if(options.length<4){
        const newOptions=[...options,""]
        const newOptionIdx=optionIdx+1;
        let currentNewOptionIndex=newOptions.length-1;
        while(newOptionIdx!==currentNewOptionIndex){
            newOptions[currentNewOptionIndex]=newOptions[currentNewOptionIndex-1]
            currentNewOptionIndex--;
            newOptions[currentNewOptionIndex]="";
        }
            setOptions(newOptions);
        
        }
        
    }
    const removeOption=(optionIdx)=>{
        if(options.length>1){
      options.splice(optionIdx,1)
      setOptions([...options]);
        }
    }

    const setOptionInArray=(value,optionIdx)=>{
        options[optionIdx]=value;
        setOptions([...options]);
    };
    const isdisabledButtonAddAndPublish=()=>   
    Question.trim()===""|| options.find((opt)=>opt.trim()==="")!==undefined;
    
    
      
    return (
        <div className="question-container">
        <InputGroup className="input-grp">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>?</InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Your Question" onChange={(e)=>setQuestion(e.target.value)} value={Question}/>
        </InputGroup>
        <p className="inputFieldText" > Options</p>
            {options.map((option,optionIdx)=>(
        <InputGroup className="inputField" key={optionIdx}>
        <Input placeholder={`Option ${optionIdx+1}`} value={option} onChange={(e)=>{setOptionInArray(e.target.value,optionIdx)}} />
        <InputGroupAddon addonType="append">
        <Button onClick={()=>addOption(optionIdx)} disabled={options.length===4}>+</Button>
        <Button onClick={()=>removeOption(optionIdx)} disabled={options.length===1}>-</Button>
        </InputGroupAddon>
        </InputGroup>

            ))}
       {options.length===4?(
                 <div className="question-buttons">
                 <Button className="survey-main-btn" style={{backgroundColor:"#af5f46"}} disabled={isdisabledButtonAddAndPublish()} onClick={addQuestion}>Add Question</Button>
                 <Button className="survey-main-btn" style={{backgroundColor:"#af5f46"}} disabled={isdisabledButtonAddAndPublish()}>Publish</Button>
                 </div>):null}
           </div>
       );
          
          }
export default MultiSelect;