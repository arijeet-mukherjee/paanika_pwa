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
import s from "./ProductDetail.css"

import { addItem } from "../../redux/cart/cart.actions";
const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";
function ProductDetail(props) {
  const location = useLocation()
  const pathname = location.pathname;
  const productId = pathname.split('/')[2] ? pathname.split('/')[2] : 1;
  console.log(productId);
  const [productDetail, setProductDetail] = React.useState(null);
  const [productImage, setProductImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showImage , setShowImage] = React.useState(null);
  function getProductDetails(){
    Util.apiCall('GET', Util.baseUrl ,`products/${productId}?getCategory=1&getDetail=1&stock=1`, Util.header)
      .then((dt)=>{
        console.log(dt,"sucess wala") 
        setProductDetail(dt.data);
        setProductImage(dt.data.product_gallary_detail);
        productImageShow(Util.imageUrl + dt.data.product_gallary_detail[0].gallary_name);
        setIsLoading(false);
      })
      .catch((e)=>{
        console.log('this error')
        console.log(e)
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
                productDetail ? productDetail.category[0].category_detail.detail[0].name : 'Sarees'
              }
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {productDetail ? productDetail.detail[0].title : 'Benarasi Saree'}
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
                      src={Util.imageUrl+_.gallary_name}
                      onClick = {
                        ()=>{
                            setShowImage(Util.imageUrl + _.gallary_name);
                            productImageShow(Util.imageUrl + _.gallary_name);
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
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1">{productDetail ? productDetail.detail[0].title : 'Benarasi Saree'}</h2>
            <h4 className="text-muted mb-4">₹{productDetail ? productDetail.product_price : '10000'}</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button className = "btn btn-outline-dark py-2 w-100"
                onClick = {
                  () => {
                    props.addItem(productDetail);
                  }
                } >
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100"  onClick = {
                  () => {
                    props.addItem(productDetail);
                  }
                }>Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">PRODUCT DETAILS</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Product Code</dt>
              <dd className="col-sm-8 mb-3">{
              productDetail ? productDetail.product_id : ''
              }</dd>
              <dt className="col-sm-4">Category Name</dt>
              <dd className="col-sm-8 mb-3">{
                productDetail ? productDetail.category[0].category_detail.detail[0].name : ''
               }
              </dd>
              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8 mb-3">Instock</dd>

              <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
                <Ratings
                  rating = {
                    productDetail && productDetail.product_rating ? parseFloat(productDetail.product_rating) : 0.00
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

            <h4 className="mb-0">PRODUCT DESCRIPTION</h4>
            <hr />
            <div className="lead flex-shrink-0 mb-3">
              
                {
                  productDetail ? ReactHtmlParser(
                    (productDetail.detail[0].desc).replace(/\|&;\$%@"<>\(\)\+,/g, "")
                    ): ''
                }
              
            </div>

            <h4 className="mb-0">CATEGORY DESCRIPTION</h4>
            <hr />
            <div className="lead flex-shrink-0">
              
                {
                  productDetail ? ReactHtmlParser(
                    (productDetail.category[0].category_detail.detail[0].description).replace(/\|&;\$%@"<>\(\)\+,/g, "")
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
