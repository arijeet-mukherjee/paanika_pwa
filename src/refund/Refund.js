import React from 'react'
import s from './Refund.css'
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";


const Refund = () => {
  return (
    <div className='outerbox'>
        {/* <ScrollToTopOnMount /> */}
        <div className='spanHead'>
            Return & Refund Policy
        </div>
        <div className='spanBody'>
            <br/>Thanks for shopping at Paanika. We only want you to have the best experience and therefore, we also promise you stree-free refunds. In order to protect regular customers
            <br/>like you from incovenience, we have designed our refund policy. 
            <br/>You must meet our terms and conditions for a good refund experience.
        </div>
        <div className='spanBody'>
            <br/>If you are not entirely satisfied with your purchase, we're here to help.
        </div>
        <div className='spanHead'>
          <br/>Returns Terms and Conditions
        </div>
        <div className='spanBody'>
          <br/>You have 7 calendar days to return an item from the date you received it.
          <br/>To be eligible for a return, your item must be unused and in the same condition that you received it.
          <br/>Your item must be in the original packaging.
          <br/>Your item needs to have the receipt or proof of purchase.
        </div>
        <div className='spanHead'>
          <br/>Refunds
        </div>
        <div className='spanHead'>
          <br/>Terms and Conditions
        </div>
        <div className='spanBody'>
          <br/>Once we receive your item, we will inspect it and notify you that we have received your returned
          <br/>item. We will immediately notify you on the status of your refund after inspecting the item.
          <br/>If your return is approved, we will initiate a refund to your credit card (or original method of payment).
          <br/>You will receive the credit within a certain amount of days, depending on your card issuer's policies.
        </div>
        <div className='spanHead'>
          <br/>Shipping
        </div>
        <div className='spanBody'>
          <br/>You will be responsible for paying for your own shipping costs for returning your item. Shipping
          <br/>costs are nonrefundable.
          <br/>If you receive a refund, the cost of return shipping will be deducted from your refund.
        </div>
    </div>
  )
}

export default Refund