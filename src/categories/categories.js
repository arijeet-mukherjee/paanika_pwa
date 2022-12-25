import { Link } from "react-router-dom";
//import Product from "../products/Product";
//import ProductH from "../products/ProductH";
import Productcard from "../components/productcard/Productcard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import Util from "../util/util";
import Spinner from "../util/spinner";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import s from './categories.css'

import { useHistory} from "react-router-dom";
import { addItem } from "../redux/cart/cart.actions";

var categories = ["Security"];
var categoriesData =[
  {
    categories_id: -1,
    categories_name: 'Security'
  }
];


function ProductList() {

 

  const [viewType, setViewType] = useState({ grid: true });

  const [allProducts, setAllProducts] = React.useState([]);

  const [allcategories , setCategories] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(true);

  const [page, setPage] = React.useState(0);
  const [totalPage, setTotalPage] = React.useState(null);
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(10000);
  const [browse , setBrowse] = React.useState(null); 
  const temp_data = [{"products_id" : "1"},{"products_id" : "2"},{"products_id" : "3"},{"products_id" : "4"}];

  let navigate = useHistory(); 
  const routeChange = (path) =>{ 
    navigate.push(path);
  }

  const location = useLocation()
  const pathname = location.pathname;
  const [categoryId, setCategoryId] = useState(pathname.split('/')[2]);

  function FilterMenuLeft() {
    return (
      <ul className="list-group list-group-flush rounded">
        <li className="list-group-item d-none d-lg-block">
          <h5 className="mt-1 mb-2">All Categories</h5>
          <div className="d-flex flex-wrap my-2">
            {categories.map((v, i) => {
              return (
                <div
                  key={i}
                  onClick={
                    () => {
                      setCategoryId("/category/"+(i+1));
                      getallproducts();
                      routeChange("/category/"+(i+1));
                      window.location.href = window.location.href;
                      window.location.reload();
                    }
                  
                  }
                  className={"btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"+ (categoryId-1 === i ? ' active' : '')}
                >
                  {v}
                </div>
              );
            })}
          </div>
        </li>
        {/* <li className="list-group-item">
          <h5 className="mt-1 mb-1">Brands</h5>
          <div className="d-flex flex-column">
            {brands.map((v, i) => {
              return (
                <div key={i} className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    {v}
                  </label>
                </div>
              );
            })}
          </div>
        </li> */}
        {/* <li className="list-group-item">
          <h5 className="mt-1 mb-1">Manufacturers</h5>
          <div className="d-flex flex-column">
            {manufacturers.map((v, i) => {
              return (
                <div key={i} className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    {v}
                  </label>
                </div>
              );
            })}
          </div>
        </li> */}
        
        <li className="list-group-item">
          <h5 className="mt-1 mb-2">Price Range</h5>
          <div className="d-grid d-block mb-3">
            <div className="form-floating mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                onChange={handleChangeFrom}
                defaultValue={fromPrice}
              />
              <label htmlFor="floatingInput">Min Price</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                onChange={handleChangeTo}
                defaultValue={toPrice}
              />
              <label htmlFor="floatingInput">Max Price</label>
            </div>
            <button className="btn btn-dark" style={{ "background" : "#DFABE2" }} onClick={()=>{
              setIsLoading(true);
              getallproducts(page,fromPrice,toPrice);
            }}>Apply</button>
          </div>
        </li>
      </ul>
    );
  }

  async function getallproducts(i, fromPrice, toPrice) {
    let queryParam = i ? `&page=${i+1}` : '';
    let queryParamPriceRange = fromPrice!==undefined && toPrice!==undefined ? `&price_from=${fromPrice}&price_to=${toPrice}` :'';
    Util.apiCall('GET', Util.baseUrl ,`products?getCategory=1&getDetail=1&productCategories=${categoryId}&stock=1&limit=5${queryParam}${queryParamPriceRange}`, Util.header)
      .then((dt)=>{
        console.log(dt,"sucess wala") 
        setAllProducts(dt.data)   
        setTotalPage(dt.meta["last_page"]);
        setIsLoading(false);
      })
      .catch((e)=>{
        console.log('this error')
        console.log(e)
      });
  }

  function getallCategories() {

    Util.apiCall('GET', Util.baseUrl ,'category?limit=200000&sortBy=id&sortType=ASC&getDetail=1&getGallary=1', Util.header)
      .then((s)=>{
        setCategories(s)      
        setIsLoading(false)
      })
      .catch((e)=>{console.log(e)});
  }

  function handleChangeFrom(event) {
    setFromPrice(event.target.value);
  }

  function handleChangeTo(event) {
    setToPrice(event.target.value);
  }

  function browseHandler(id){
    setBrowse(id);
    console.log(id);
  }
  React.useEffect(() => {    
     getallCategories()
  }, []);

  React.useEffect(()=>{
    getallproducts();
    setPage(0);
    }, []);

  //const prodList = [...allProducts]

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }
  //console.log(allProducts);
  
  if(allcategories){
    
    const tempArr = Array.from(allcategories.data,(_,i)=>{
      return _.name;
    });
    categoriesData = Array.from(allcategories.data);
    categories = tempArr;
  }
  return (
    <div className="mt-5 py-5 px-xl-5">
      <ScrollToTopOnMount />

      <nav aria-label="breadcrumb" className="bg-custom-light rounded" style={{ "background" : "#DFABE2"}}>
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
              replace
            >
              All Prodcuts
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Newest
          </li>
        </ol>
      </nav>

      <div className="h-scroller d-block d-lg-none">
        <nav className="nav h-underline">
          {categoriesData.map((v, i) => {
            return (
              < div key = {
                v.id
              }
              className = "h-link me-2" >
                <Link
                  to={"/category/"+v.id}
                  className="btn btn-sm btn-outline-dark rounded-pill"
                  replace
                >
                  {
                    v.name
                  }
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="row mb-3 d-block d-lg-none">
        <div className="col-12">
          <div id="accordionFilter" className="accordion shadow-sm">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Filter Products
                </button>
              </h2>
            </div>
            <div
              id="collapseFilter"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFilter"
            >
              <div className="accordion-body p-0">
                <FilterMenuLeft />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-4 mt-lg-3">
        <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft />
          </div>
        </div>
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-3 d-none d-lg-block">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue=""
                >
                  <option value="">Newest</option>
                  <option value="1">a-z</option>
                  <option value="2">z-a</option>
                  <option value="3">Most liked</option>
                </select>
              </div>
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search products..."
                    aria-label="search input"
                  />
                  <button className="btn btn-outline-dark" style={{ "background" : "#DFABE2"}}>
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                  style={{ "background" : "#DFABE2"}}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            {
              isLoading ? < Spinner /> : 
            
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {
                allProducts && allProducts.length > 0 ? [...allProducts].map((e,i)=>{
                  if (viewType.grid) {
                    return (
                         <Productcard key={i} products={e}/>
                       );
                     }
                     return (
                      <Productcard key={i} products={e}/>
                     );
                }) :''
              }
            </div>
            }
            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted small d-none d-md-inline">
                Showing {page+1} of {
                  totalPage ? totalPage : 1
                }
              </span>
              <nav aria-label="Page navigation example" className="ms-auto">
                <ul className="pagination my-0">
                  <li className="page-item">
                    <a className="page-link" href="!#">
                      Previous
                    </a>
                  </li>
                  {
                    Array.from({
                      length: totalPage ? totalPage : 1
                    },(_,i)=>{
                      return(
                        < li className = {
                          page === i ? 'page-item active' : 'page-item'
                        } >
                          < button className = "page-link"
                          id = {
                            i
                          }
                          onClick = {
                              () => {
                            //pageHandler(i);
                            setIsLoading(true);
                            setPage(i);
                            getallproducts(i,fromPrice,toPrice);
                            }}>
                            {i+1}
                          </button>
                        </li>
                      );
                    })
                  }                  
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});


export default connect(null, mapDispatchToProps)(ProductList);
