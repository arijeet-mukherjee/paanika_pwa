import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Util from "../util/util";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { addItem } from "../redux/cart/cart.actions";
function Product(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;
  var product_data = [];
  
  console.log(props)
  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{price}Ks</del> {price - (props.percentOff * price) / 100}Ks
      </>
    );
  }
  if (props.productdata) {
    product_data = props.productdata;
  }
  return (
    <div className="col">
      <div className="card shadow-sm">
        < Link to = {"/products/"+product_data.products_id}
        href = "!#"
        replace >
          {percentOff}
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src = {
              product_data ? (  Util.imageUrl+product_data.products_image) : Image
            }
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {product_data ? (product_data.products_name) : 'products_name'}
          </h5>
          <p className="card-text text-center text-muted mb-0">${product_data ? (product_data.products_price) : 'products_price'}</p>
          <div className="d-grid d-block">
            < button className = "btn btn-outline-dark mt-3"
            onClick = {
              () => {
                props.addItem(product_data);
              }
            } >
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(Product);
