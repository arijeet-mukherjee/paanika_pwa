import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";
import React, { Component } from 'react';
function FeatureProduct(props) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to = {
          "/category/" + props.id
        }>
        <img
          className="card-img-top bg-dark cover"
          height="240"
          alt=""
          src={props.src}
        />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center">{props.name}</h5>
          <p className="card-text text-center text-muted">{props.total_product} Products</p>
          <div className="d-grid gap-2">
            <Link to={"/category/" + props.id } className="btn btn-outline-dark" replace>
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;
