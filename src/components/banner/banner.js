import BannerZero from "./banner-0.jpg";
import BannerOne from "./banner-1.jpg";
import BannerTwo from "./banner-2.jpg";
import s from "./banner.css";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
function BannerIncidator(props) {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}
      className={props.active ? "active" : ""}
      aria-current={props.active}
    />
  );
}

function BannerImage(props) {
  return (
    <div
      className={"carousel-item " + (props.active ? "active" : "")}
      data-bs-interval="5000"
    >
      <div
        className="ratio"
        style={{ "--bs-aspect-ratio": "50%", maxHeight: "460px" }}
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
    </div>
  );
}

function Banner() {
  return (
    <>
        <div className="bannerContainer">
            <div className="bannerItem" style={{"margin-top": "56px"}}>
                   <div className="carousel bannerText">
                        <span style={{display:'block'}}>
                        Sarees that
                        </span>
                        <span style={{display:'block'}}>
                        make your soul
                        </span>
                        <span style={{display:'block'}}>
                        shine through!
                        </span>
                   </div>
                   <p className="paraBanner">
                        Get India’s traditional heritage of handloom<br/>sarees and dress materials delivered at<br/> your door step.
                   </p>
                   <div className="d-flex justify-content-left">
                        <Link to="/products" className="btn btn-primary" replace style={{background: '#DFABE2',border: '1px solid #000000', color:"#000"}}>
                            SHOP NOW
                        </Link>
                   </div>
            </div>
            <div className="bannerItem bannerItemImage">
                <div
                id="bannerIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
                style={{ marginTop: "56px" }}
                >
                <div className="carousel-indicators">
                    <BannerIncidator index="0" active={true} />
                    <BannerIncidator index="1" />
                    <BannerIncidator index="2" />
                </div>
                <div className="carousel-inner">
                    <BannerImage image={BannerZero} active={true} />
                    <BannerImage image={BannerOne} />
                    <BannerImage image={BannerTwo} />
                </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Banner;
