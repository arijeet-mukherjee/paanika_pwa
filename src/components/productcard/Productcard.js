import Image from "./p1.png";
import { Link } from "react-router-dom";
import s from "./Productcard.css"
import { connect } from "react-redux";
import React, { Component } from 'react';
import { addItem } from "../../redux/cart/cart.actions";
import { useState } from "react";
import { useEffect } from "react";
import cartLogo from "./cart.png"
import wishLogo from "./wish.png"

function Productcard(props) {
  const price = 10000;
  const[product_data, setProductData] = useState([]);
  useEffect(()=>{
    setProductData(props.products);
  },[product_data]);
  return (
    <div className="col ms-1">
      <div className="card">
        <Link to = {"/products/"+ (product_data ? (product_data.products_id) :'id')}
        href = "!#"
        replace >
            <img
            className="card-img-top bg-dark cover"
            height="280px"
            width={"250px"}
            alt=""
            src = {
              //product_data ? (Util.imageUrl+product_data.products_image) : Image
              Image
            }
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {product_data ? (product_data.products_name) : 'products_name'}
          </h5>
          <p className="card-text text-center text-muted mb-0">${product_data ? (product_data.products_price) : price}</p>
        </div>
      </div>
      
      <div className="d-flex flex-row">
            <button className = "btn btn-outline-dark flex-fill bd-highlight mt-1 mr-1 mb-1"
            onClick = {
              () => {
                props.addItem(product_data);
              }
            } >
              <img alt="Paanika" src={wishLogo} height="20px" width="23px"></img> WISHLIST
            </button>
            <button className = "btn btn-outline-dark flex-fill bd-highlight mt-1 mb-1 ml-1" style={{"marginRight": "0.20rem", "whiteSpace": "nowrap"}}
            onClick = {
              () => {
                props.addItem(product_data);
              }
            } >
              <img alt="Paanika" src={cartLogo} height="20px" width="19px"></img> BUY NOW
            </button>
        </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(Productcard);
