import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import React, { Component } from 'react';
import DropdownImage  from "./dropdown.png";
import s from "./pills.css";

function Pills(props) {
  return (
    <div className="pills">
        {/* <img src={DropdownImage} className="dropdownLogo" /> */}
        <p className="textPills">{props.name}</p>
    </div>
  );
}

export default Pills;
