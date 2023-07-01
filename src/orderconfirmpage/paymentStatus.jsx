import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

function PaymentStatus(props) {

    const location = useLocation()

  return (
    <div>PaymentStatus
        {console.log(location)}
    </div>
  )
}

export default PaymentStatus