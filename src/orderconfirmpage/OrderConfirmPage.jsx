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
import s from './OrderConfirmPage.css'

function OrderConfirmPage(props){

  const [fdata, setFdata] = useState({
    billing_first_name: '',
    billing_last_name: '',
    billing_street_aadress: '',
    billing_city: '',
    billing_postcode: '',
    billing_country: null,
    billing_state: '',
    billing_phone: '',
    delivery_first_name: '',
    delivery_last_name: '',
    delivery_street_aadress: '',
    delivery_city: '',
    delivery_postcode: '',
    delivery_country: '',
    delivery_state: '',
    delivery_phone: '',
    currency_id: '',
    language_id: '',
    session_id: '',
    payment_method: '',
    latlong: '',
    payment_id: '',
    cc_cvc: '',
    cc_expiry_month: '',
    cc_expiry_year: '',
    cc_number: '',
  });

  const [country ,setCountry] = useState([]);

    function handleStateChange(fieldName, fieldValue) {
      setFdata({ ...fdata, [fieldName]: fieldValue})
      console.log(fdata)
    }

    const apiCall = async () => {
      fdata['delivery_street_aadress'] = fdata.billing_street_aadress;
      const config = {
        method: 'POST',
            url: "http://admin.paanika.com/api/client/order",
            headers: {
              'clientsecret': 'sk_1234', 
              'clientid': '1234',
              'Access-Control-Allow-Origin': '*'
          },
            data : fdata ? fdata : ''
      }
      
      const result = await axios(config)
        .then(
        response => response.data 
        )
        .then((data)=>{
        console.log(data)
        })
        .catch(e => console.log(e));
    
    }

    const getAllCountries= async () => {
      await Util.apiCall('GET', Util.baseUrl ,`country?limit=1000&getStates=1`, Util.header)
      .then((dt)=>{
        console.log(dt,"sucess wala"); 
        setCountry(dt.data);
      })
      .catch((e)=>{
        console.log('this error')
        console.log(e)
      });
    }

    useEffect(()=>{
      getAllCountries();
    }, []);

    return (
        <>
        <div class="ordercontainer">
          <div class="title-order">
              <h2>Complete My Order</h2>
          </div>
        <div class="d-flex-order">
        <form action="" method="" class="form-order">
            <label class="label-order">
              <span class="fname">First Name <span class="required">*</span></span>
              <input type="text" name="fname" class="order-input" onChange={e => handleStateChange("billing_first_name", e.target.value)}/>
            </label>
            <label class="label-order">
              <span class="lname">Last Name <span class="required">*</span></span>
              <input type="text" name="lname" class="order-input" onChange={e => handleStateChange("billing_last_name", e.target.value)}/>
            </label>
            <label class="label-order">
              <span>Country <span class="required">*</span></span>
              <select name="billing_country" class="order-select" required onChange={e => handleStateChange('billing_country', Number(e.target.value))} value={fdata.billing_country}>
                <option value="select">Select your country...</option>
                {
                  country ? country.map((v, i)=>{
                    return <option value={v.country_id}>{v.country_name}</option>
                  }) : ''
                }
              </select>
            </label>
            <label class="label-order">
                <span>State / County <span class="required">*</span></span>
                <select class="order-select" required onChange={e => handleStateChange('billing_state', Number(e.target.value))} value={fdata.billing_state}>
                  <option value="select">Select your state...</option>
                  {/* <input type="text" class="order-input" name="billing_state" onChange={e => handleStateChange(e.target.name, e.target.value)}/>  */}
                  {
                    fdata.billing_country !== null && country ? country[fdata.billing_country - 1].states.map((v,i)=>{
                      return <option value={v.id}>{v.name}</option>
                    }) :''
                  }
                </select>
            </label>    
        <label class="label-order">
          <span>Street Address <span class="required">*</span></span>
          <input type="text" class="order-input" name="houseadd" placeholder="House number and street name" required onChange={e => handleStateChange("billing_street_aadress", e.target.value)}/>
        </label>
        <label class="label-order">
          <span>&nbsp;</span>
          <input type="text" class="order-input" name="apartment" placeholder="Apartment, suite, unit etc. (optional)"/>
        </label>
        <label class="label-order">
          <span>Town / City <span class="required">*</span></span>
          <input type="text" class="order-input"  name="billing_city" onChange={e => handleStateChange(e.target.name, e.target.value)}/> 
        </label>
        <label class="label-order">
          <span>Postcode / ZIP <span class="required">*</span></span>
          <input type="text" class="order-input" name="city" onChange={e => handleStateChange("billing_postcode", e.target.value)}/> 
        </label>
        <label class="label-order">
          <span>Phone <span class="required">*</span></span>
          <input type="tel" class="order-input" name="city" onChange={e => handleStateChange("billing_phone",  Number(e.target.value))}/> 
        </label>
        <label class="label-order">
          <span>Email Address <span class="required">*</span></span>
          <input class="order-input" type="email" name="city"/> 
        </label>
      </form>
      <div class="Yorder">
        <table class="table-order">
          <tr>
            <th colspan="2">Your order</th>
          </tr>
          <tr>
            <td>Product Name x 2(Qty)</td>
            <td>$88.00</td>
          </tr>
          <tr>
            <td>Subtotal</td>
            <td>$88.00</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>Free shipping</td>
          </tr>
        </table><br/>
        <div>
          <input type="radio" name="dbt" value="dbt" checked/> Direct Bank Transfer
        </div>
        <p>
            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
        </p>
        <div>
          <input type="radio" name="dbt" value="cd"/> Cash on Delivery
        </div>
        <div>
          <input type="radio" name="dbt" value="cd" /> Paypal <span>
          <img src="https://www.logolynx.com/images/logolynx/c3/c36093ca9fb6c250f74d319550acac4d.jpeg" alt="" width="50"/>
          </span>
        </div>
        <button type="button" class="btn-order" onClick={() => apiCall()}>Place Order</button>
      </div>
    </div>
    </div>
        </>
    );
}
export default OrderConfirmPage;