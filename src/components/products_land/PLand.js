import s from "./PLand.css"
import { connect } from "react-redux";
import React, { Component } from 'react';
import { addItem } from "../../redux/cart/cart.actions";
import { useState } from "react";
import { useEffect } from "react";
import Productcard from "../productcard/Productcard";

function PLand(props) {
  const[products, setProductData] = useState([]);
  const[image, setImage] = useState('');
  const[label, setLabel] = useState('');
  useEffect(()=>{
    setProductData(props.products);
  },[products]);
  useEffect(()=>{
    setLabel(props.label);
  },[label]);
  useEffect(()=>{
    setImage(props.image);
  },[]);
  return (
    <div className="flexLandColumn m-1" style={{"margin-bottom" : "20px","display" :'flex'}}>
        <div class="d-flex flex-column justify-content-center m-lg-1" style={{"background-image" : `url(${image})`,"background-size": "cover", "height" :"180px"}}>
            
        </div>
        <div class="row">
        {
        products ? [...products].map((v, i) => {
            return (
                <Productcard products={v} />
            );
          }) : ''
      }
        </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(PLand);
