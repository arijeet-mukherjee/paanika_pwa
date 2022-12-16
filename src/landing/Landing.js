import Banner from "../components/banner/banner";
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
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
const baseUrl = "https://instaworksbyarijeet.games/public/api/";
var formdata = new FormData();
formdata.append("language_id", "1");
var config = {
  method: 'post',
  url: baseUrl+'allcategories',
  headers: { 
    'consumer_secret': '8464dfefecf7f555d49cce041116bbd5', 
    'consumer-key': '85614bbbcb0cb1bf0494983ea67b3a85', 
    'consumer-device-id': '', 
    'consumer-nonce': '', 
    'Access-Control-Allow-Origin': '*',
        
    'consumer-ip': '1.1.1.1'
  },
  data : formdata
};
function Landing(props) {
  const [categories , setCategories] = React.useState(null);
  //const [isLoading , setIsLoading] = React.useState(false);
  const posts = useSelector((state) => state);
  console.log(posts);

  React.useEffect(()=>{
      //setIsLoading(true);
      function getCategories(){
        config.headers["consumer-nonce"] = generateString(15);
        config.headers["consumer-device-id"] = generateString(16);
        axios(config)
        .then(
          response => response.data 
        )
        .then((data)=>{
          setCategories(data);
          //setIsLoading(false);
        })
        .catch(function (error) {
          setCategories({data:[{id:1},{id:2}]});
        });
      } 
      getCategories();
  },[]);
  useEffect(()=>{
    console.log("Saving State");
  },[categories]);
  console.log(categories);
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
            <div className="landingbannerItem2">
                <img
                      className="d-block w-100 h-100 cover"
                      alt=""
                      src={butterfly}
                    />
            </div>
            <div className="landingbannerItem" style={{"height":"auto","color" :"#000"}}>

            </div>
      </div>
     
      <h2 className="text-muted text-center mt-4 mb-3">All Cateogies</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {Array.from(categories?categories.data:{length :0}, (_, i) => {
            console.log(_.icon);
            return <FeatureProduct id = {_.categories_id} key={_.categories_id} src={'https://instaworksbyarijeet.games/'+_.icon} name={_.categories_name} total_product={_.total_products}/>;
          })}
        </div>
      </div>
    </>
  );
}

export default connect(null,{selectCurrentUser})(Landing);
