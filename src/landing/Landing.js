import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect } from "react";
import  FormData  from "form-data";
import { connect, useSelector } from "react-redux";
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
          console.log(error);
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
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          InstaWorks provide professional services and quality products in the electrical, technological, automated and essential fields. Catering to both domestic and commercial customers.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse products
          </Link>
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
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default connect(null,{selectCurrentUser})(Landing);
