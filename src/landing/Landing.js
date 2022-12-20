import Banner from "../components/banner/banner";
import PLand from "../components/products_land/PLand";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import butterfly from "./butterfly.png";
import  FormData  from "form-data";
import { connect, useSelector } from "react-redux";
import s from "./landing.css";
import {selectCurrentUser} from "../redux/user/user.selectors";
import pland1 from "./pland1.png"
import pland2 from "./pland2.png"
import pland3 from "./pland3.png"
import Pills from "../components/pills/Pills";
import Util from "../util/util";
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function Landing(props) {
  const [sareeCategories , setSareeCategories] = React.useState([]);
  const [dressCategories , setDressCategories] = React.useState([]);
  const [dupattaCategories , setDupattaCategories] = React.useState([]);
  const [pillNames, setPillNames] = React.useState([]);
  //const product_data = [{"products_id" : "1"},{"products_id" : "2"},{"products_id" : "3"},{"products_id" : "4"}];
  //const [isLoading , setIsLoading] = React.useState(false);
  const posts = useSelector((state) => state);
  console.log(posts);
  React.useEffect(()=>{
      setPillNames(Util.pillNames);
  },[]);
  function getSareeCategories(){
    Util.apiCall('GET', Util.baseUrl ,'products?stock=1&limit=4&language_id=1&currency=2&getCategory=1&getDetail=1&productCategories=1&isFeatured=1', Util.header)
    .then((s)=>{
      console.log("Sarees",s);
      setSareeCategories(s.data);
    })
    .catch((e)=>{
      console.log(e)
    });
  }
  function getDressCategories(){
    Util.apiCall('GET', Util.baseUrl ,'products?stock=1&limit=4&language_id=1&currency=2&getCategory=1&getDetail=1&productCategories=3&isFeatured=1', Util.header)
    .then((s)=>{
        console.log("Dress",s);
        setDressCategories(s.data);
      })
    .catch((e)=>{
        console.log(e)
      });
  }
  function getDupattaCategories(){
    Util.apiCall('GET', Util.baseUrl ,'products?stock=1&limit=4&language_id=1&currency=2&getCategory=1&getDetail=1&productCategories=2&isFeatured=1', Util.header)
    .then((s)=>{
        console.log("Dupatta",s);
        setDupattaCategories(s.data);
      })
    .catch((e)=>{
        console.log(e)
      });
  }
  React.useEffect(()=>{
    getSareeCategories()
  },[]);
  React.useEffect(()=>{
    getDressCategories()
  },[]);
  React.useEffect(()=>{
    getDupattaCategories()
  },[]);

  const sareeList = sareeCategories.map(({product_id, detail})=>{
    return detail;
  });
  const dressList = dressCategories.map(({product_id, detail})=>{
    return <PLand products = { detail } label = {"fdfdfdf"} image={`${pland2}`}/>;
  });
  const dupattaList = dupattaCategories.map(({product_id, detail})=>{
    return <PLand products = { detail } label = {"fdfdfdf"} image={`${pland3}`}/>;
  });

  return (
    <>
      <ScrollToTopOnMount />
      <Banner />

      <div className="landingBannerContainer" style={{"border": "1px solid #000000","border-radius": "12px","margin": "56px 32px 26px 32px"}}>
            <div className="landingbannerItem" style={{"height":"auto","color" :"#000"}}>
                  <div className="carousel bannerText">
                        <span style={{display:'block'}}>
                        Know your Paanika
                        </span>
                   </div>
                   <p className="paraBanner">
                   Paanika is an online fashion store that sells handwoven fabrics and<br/>handcrafted items made by artisans all over India.
                   We bring the best of Indian <br/>heritage to life by weaving traditional fabrics into clothing such as sarees,<br/> kurtas, suits,
                   and more for men, women, and children!
                   </p>
            </div>
            <div className="landingbannerItem2">
                <img
                      className="d-block w-100 h-100 cover"
                      alt=""
                      src={butterfly}
                    />
            </div>
      </div >

      <div className="landingBannerContainer" style={{"margin": "56px 32px 26px 32px", "background": "#fff", "justify-content":"flex-start"}}>
            <div className="landingbannerItem3">
            {[...pillNames].map((x, i) =>
              
              <Pills name ={x} />
            )}
                
            </div>
            <div className="flexLandColumn">
                <div className="landingbannerItem flexProduct" style={{"color" :"#000"}}>
                    {<PLand products = { sareeList } label = {"fdfdfdf"} image={`${pland1}`}/>}
                    {dressList}
                    {dupattaList}
                </div>
            </div>
            
      </div>
     
      {/* <h2 className="text-muted text-center mt-4 mb-3">All Cateogies</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {Array.from(categories?categories.data:{length :0}, (_, i) => {
            console.log(_.icon);
            return <FeatureProduct id = {_.categories_id} key={_.categories_id} src={'https://b424-116-206-220-173.in.ngrok.io/'+_.icon} name={_.categories_name} total_product={_.total_products}/>;
          })}
        </div>
      </div> */}
    </>
  );
}

export default connect(null,{selectCurrentUser})(Landing);
