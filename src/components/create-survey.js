import {Button} from 'reactstrap';
import React, { useState,useEffect} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MultiSelect from './multi-select';
import Singleselect from './single-select';
import {useParams,useLocation,useHistory} from "react-router-dom";
function CreateSurvey() {
  const {surveyId}=useParams();
  const query=useLocation().search;
  const history=useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownText,setDropdownText]=useState("Select Question Type")
    useEffect(()=>{
      if(query==='?clear=true'){
        setDropdownText("select question Type")
        history.push('/create'+surveyId);
      }
    },[query,history,surveyId]);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
      <>
      <p>
        Survey Id :{surveyId}
      </p>
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret style={{background:" #af5f46"}}>
       {dropdownText}
        </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={()=>setDropdownText("Multi select Question")} >Multi Select Question</DropdownItem>
        <DropdownItem onClick={()=>setDropdownText("single select Question")} >Single Select Question</DropdownItem>
      </DropdownMenu>
    </Dropdown>
      {dropdownText==="Multi select Question"?<MultiSelect/>:null}
      {dropdownText==="single select Question"?<Singleselect/>:null}
    </>
  );  
      

}

export default CreateSurvey;