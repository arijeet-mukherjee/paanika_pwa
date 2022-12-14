import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import Util from "../util/util";
import Spinner from "../util/spinner";
import axios from "axios";
import React, { useEffect } from "react";

//const brands = ["Apple", "Samsung", "Google", "HTC"];

//const manufacturers = ["HOCO", "Nillkin", "Remax", "Baseus"];

var categories = ["Security"];
var categoriesData =[
  {
    categories_id: -1,
    categories_name: 'Security'
  }
];
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

var formdata = new FormData();
formdata.append("language_id", "1");
var configCategories = {
  method: 'post',
  url: Util.baseUrl + 'allcategories',
  headers: Util.header,
  data: formdata
};

function FilterMenuLeft() {
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">All Categories</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((v, i) => {
            return (
              <Link
                key={i}
                to="/products"
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                replace
              >
                {v}
              </Link>
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
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue="0"
            />
            <label htmlFor="floatingInput">Min Price</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue="50000"
            />
            <label htmlFor="floatingInput">Max Price</label>
          </div>
          <button className="btn btn-dark">Apply</button>
        </div>
      </li>
    </ul>
  );
}

function ProductList() {

  const [viewType, setViewType] = useState({ grid: true });

  const [allProducts, setAllProducts] = React.useState(null);

  const [allcategories , setCategories] = React.useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = React.useState(null);

  const [browse , setBrowse] = React.useState(null); 

  config.headers["consumer-device-id"] = Util.generateString(14);
  config.headers["consumer-nonce"] = Util.generateString(14);
  configCategories.headers["consumer-device-id"] = Util.generateString(14);
  configCategories.headers["consumer-nonce"] = Util.generateString(14);

  function getallproducts(pagenumber) {
    if(pagenumber){
      config.data.page_number = pagenumber;
    }
    axios(config)
      .then((response) => response.data)
      .then((data) => {
        setAllProducts(data);
        setIsLoading(false);
        //setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getallCategories() {
    axios(configCategories)
      .then((response) => response.data)
      .then((data) => {
        setCategories(data);
        setIsLoading(false)
        //setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function pageHandler(pagenumber) {
    config.data.page_number = pagenumber;
    config.headers["consumer-device-id"] = Util.generateString(14);
    config.headers["consumer-nonce"] = Util.generateString(14);
    getallproducts(pagenumber);
    console.log('====================================');
    console.log(pagenumber);
    console.log('====================================');
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

  

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }
  console.log(allProducts);
  
  if(allcategories){
    
    const tempArr = Array.from(allcategories.data,(_,i)=>{
      return _.categories_name;
    });
    categoriesData = Array.from(allcategories.data);
    categories = tempArr;
  }
  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
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
                v.categories_id
              }
              className = "h-link me-2" >
                <Link
                  to="/products"
                  className="btn btn-sm btn-outline-dark rounded-pill"
                  replace
                >
                  {
                    v.categories_name
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

      <div className="row mb-4 mt-lg-3">
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
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            {
              isLoading ? < Spinner / > : 
            
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {
                Array.from(allProducts ? allProducts.product_data :{
                      length: 5
                    }, (_, i) => {
                if (viewType.grid) {
                  return (
                    <Product key={i} percentOff={null} productdata={_}/>
                  );
                }
                return (
                  <ProductH key={i} percentOff={null} productdata={_}/>
                );
              })}
            </div>
            }
            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted small d-none d-md-inline">
                Showing {page+1} of {
                  allProducts ? Math.floor(allProducts.total_record / 10) : 1
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
                      length: allProducts?(allProducts.total_record / 10) : 1
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
                            pageHandler(i);
                            setPage(i);
                            setIsLoading(true);
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

export default ProductList;
