import React, { useEffect, useState } from 'react'
import s from "./paymentStatus.css";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';

function PaymentStatus(props) {

    const location = useLocation();
  const [paymentStatusData, setPaymentStatusData] = useState([]);
    const [ isSuccess , setIsSuccess ] = useState(false);

    useEffect(()=>{
      console.log(location);
      location && location.state && location.state.data ? setPaymentStatusData(location.state.data) : setPaymentStatusData([]);
      location && location.state && location.state.data && location.state.data.success ? setIsSuccess(true) : setIsSuccess(false);
    }, []);

  const generateHTMLTable = function (data) {
    return (
        <table width="40%" height="100" border='1' align="center">
          <tbody>
            {
            Object.entries(data).map((v,i) => {
                if(v[1] !== '' && v[1] !== 'null') {return <tr>
                  <td>
                    {v[0] + "     " + v[1]}
                  </td>
                </tr>}
              })
            }
          </tbody>
        </table>
  );
  };

  return (
    isSuccess ? (<>
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            Order Placed Succesfully 🥳🥳🥳
          </p>
          <h2>Thank you for your order!</h2>
          <p className="email-msg">We will contact you when your order is shipped.</p>
          <p className="description">
            Please Find below order details : <br />
          </p>
          <span>
            {paymentStatusData && paymentStatusData.data && generateHTMLTable(JSON.parse(JSON.stringify(paymentStatusData.data)))}
          </span>
          <Link to= "/" >
            <button type="button" width="300px" className="btn" style={{ background: '#DFABE2'}}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </>) : (<>
        <div className="success-wrapper">
          <div className="error">
            <p className="icon">
              Transaction Failed 🥲🥲🥲
            </p>
            <h2>Please Try Again!</h2>
            <p className="email-msg">We Promise to serve you best.</p>
            <p className="description">
              Please Find below details of failed payment : <br />
            </p>

            <span className="description">
              {paymentStatusData && paymentStatusData.data ? paymentStatusData.data.order_status + paymentStatusData.data.status_message : ''} <br />
            </span>

            <Link to="/">
              <button type="button" width="300px" className="btn " style={{ background: '#DFABE2' }}>
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
    </>)
  )
}

export default PaymentStatus