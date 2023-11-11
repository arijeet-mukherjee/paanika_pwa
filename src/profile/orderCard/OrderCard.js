import React from "react";

import "./OrderCard.css";

function OrderCard() {
	return (
		<div className="card__border">
			<div className="card__status">
				<div className="card__icon">Icon</div>
				<div className="status">
					<div className="state">Delivered</div>
					<div className="date">On 12th October, 2023 as per your request</div>
				</div>
			</div>
			<div className="card__details">
				<div className="card__image">
					<image>some image</image>
				</div>
				<div className="card__description">
					<h5>Product Name</h5>
					<p>₹ 2500</p>
				</div>
			</div>
		</div>
	);
}

export default OrderCard;
