import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";

import CheckoutItem from "../components/checkout-item/checkout-item.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../redux/cart/cart.selectors";

import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer,
  HoverContainer
} from "./checkout.styles";

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalContainer>TOTAL: ₹{total}</TotalContainer>
   {cartItems.length === 0 ? (
    <HoverContainer>
    <button className="btn btn-dark py-2 w-100" disabled={true}>Please Add Items To Continue</button>
</HoverContainer>
   ) :(<Link to='/order'>
   <HoverContainer>
                <button className="btn btn-dark py-2 w-100">Buy now</button>
    </HoverContainer>
    {/* <StripeCheckoutButton price={total} /> */}
    </Link>)}
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
