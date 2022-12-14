import Image from "../../nillkin-case-1.jpg";
import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import { useLocation } from 'react-router-dom'
import Util from "../../util/util";
import Spinner from "../../util/spinner";
import axios from "axios";
import React, { useEffect } from "react";
import ReactHtmlParser from 'react-html-parser'
import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions";
const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";
const config = {
  method: "post",
  url: Util.baseUrl + "getallproducts",
  headers: Util.header,
  data: {
    page_number: 0,
    language_id: 1,
    customers_id: "",
    categories_id: "",
    products_id: "",
    type: "",
    filters: "",
    price: "",
    currency_code: "USD",
    multiple_products_id: "",
    vendors_id: "",
  },
};
function ProductDetail(props) {
  const location = useLocation()
  const pathname = location.pathname;
  const productId = pathname.split('/')[2];
  console.log(productId);
  config.headers["consumer-device-id"] = Util.generateString(14);
  config.headers["consumer-nonce"] = Util.generateString(14);
  config.data.products_id = productId;
  const [productDetail, setProductDetail] = React.useState(null);
  const [productImage, setProductImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showImage , setShowImage] = React.useState(null);
  function getProductDetails(){
    axios(config)
      .then((response) => response.data)
      .then((data) => {
        setProductDetail(data.product_data);
        setProductImage(data.product_data[0].images);
        productImageShow(Util.imageUrl + data.product_data[0].products_image)
        setIsLoading(false);
        //setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function productImageShow(str){
    setShowImage(str);
  }
  function getDescription(string){
    var imgRegex = new RegExp("<img[^>]*?>", "g");
    var clean = string.replace(string.match('"<img[^>]*?>"'), "");
    console.log(clean);
    return clean;
  }
  React.useEffect(()=>{
    getProductDetails();
  },[]);
  function changeRating(newRating) {}
  console.log(productDetail ? productImage : '');
  return (
    isLoading ? < Spinner / > : < div className = "container mt-5 py-4 px-xl-5" >
      <ScrollToTopOnMount/>
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              All Prodcuts
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              {
                productDetail ? productDetail[0].categories[0].categories_name : ''
              }
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {productDetail ? productDetail[0].products_name : ''}
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
              {Array.from(productImage ? productImage : { length: 0 }, (_, i) => {
                let selected = i !== 1 ? "opacity-6" : "";
                return (
                  
                    <img
                      className={"rounded mb-2 ratio " + selected}
                      alt=""
                      src={Util.imageUrl+_.image}
                      onClick = {
                        ()=>{
                            setShowImage(Util.imageUrl + _.image);
                        }
                      }
                    />
                  
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src = {
                  showImage ? showImage : ''
                }
              />
            </div>
          </div>

          {/* <div className="row mt-2">
            <div className="col-12">
              <div
                className="d-flex flex-nowrap"
                style={{ overflowX: "scroll" }}
              >
                {Array.from({ length: 8 }, (_, i) => {
                  return (
                    <a key={i} href="!#">
                      <img
                        className="cover rounded mb-2 me-2"
                        width="70"
                        height="70"
                        alt=""
                        src={Image}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div> */}
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{productDetail ? productDetail[0].products_name : ''}</h2>
            <h4 className="text-muted mb-4">${productDetail ? productDetail[0].products_price : ''}</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                < button className = "btn btn-outline-dark py-2 w-100"
                onClick = {
                  () => {
                    props.addItem(productDetail[0]);
                  }
                } >
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100"  onClick = {
                  () => {
                    props.addItem(productDetail[0]);
                  }
                }>Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Code</dt>
              <dd className="col-sm-8 mb-3">{productDetail ? productDetail[0].categories[0].categories_id : ''}</dd>

              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">{productDetail ? productDetail[0].categories[0].categories_name : ''}</dd>

              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8 mb-3">Instock</dd>

              <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating = {
                    productDetail ? parseFloat(productDetail[0].rating) : 0.00
                  }
                  widgetRatedColors="rgb(253, 204, 13)"
                  changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    return (
                      <Ratings.Widget
                        key={i}
                        widgetDimension="20px"
                        svgIconViewBox="0 0 19 20"
                        svgIconPath={iconPath}
                        widgetHoverColor="rgb(253, 204, 13)"
                      />
                    );
                  })}
                </Ratings>
              </dd>
            </dl>

            <h4 className="mb-0">Description</h4>
            <hr />
            <div className="lead flex-shrink-0">
              
                {
                  productDetail ? ReactHtmlParser(
                    (productDetail[0].products_description).replace(/\|&;\$%@"<>\(\)\+,/g, "")
                    ): ''
                }
              
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <RelatedProduct key={i} percentOff={i % 2 === 0 ? 15 : null} />
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(ProductDetail);
