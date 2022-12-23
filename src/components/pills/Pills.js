import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import React, { Component } from 'react';
import DropdownImage  from "./dropdown.png";
import s from "./pills.css";
import { useHistory} from "react-router-dom";
function Pills(props) {
  let navigate = useHistory(); 
  const routeChange = (path) =>{ 
        navigate.push(path);
  }

  const callNavigate = () =>{
    console.log(props.name);
    switch(props.name) {
      case 'CATEGORIES':
        routeChange(`/products`);
        break;
      case 'DRESS':
          routeChange(`category/`+3);
        break;
      case 'DUPATTA':
          routeChange(`category/`+2);
        break;
      case "SAREE":
            routeChange(`category/`+1);
        break;
      default:
        console.log(props.name);
    }
  }
  return (
    <>
            <div className="pills" onClick={() => callNavigate()} >
                {/* <img src={DropdownImage} className="dropdownLogo" /> */}
                <p className="textPills">{props.name}</p>
            </div>
    </>
  );
}

export default Pills;
