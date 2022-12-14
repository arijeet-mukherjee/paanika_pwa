import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Util from "../util/util";
import { connect } from "react-redux";

import { addItem } from "../redux/cart/cart.actions";
function ProductH(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;
  var product_data = [];
  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", left: "0.5rem" }}
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
        <div className="row g-0">
          <div className="col-4">
            <Link to="/products/1" href="!#" replace>
              {percentOff}
              <img
                className="rounded-start bg-dark cover w-100 h-100"
                alt=""
                src={product_data ? (Util.imageUrl+product_data.products_image) : Image}
              />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">
                  {
                    product_data ? (product_data.products_name) : 'products_name'
                  }
                </h5>
                <span className="card-text text-muted mb-2 flex-shrink-0">
                  $ {
                    product_data ? (product_data.products_price) : 'products_price'
                  }
                </span>
                <div className="mt-auto d-flex">
                  < button className = "btn btn-outline-dark ms-auto"
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
        </div>
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(ProductH);
