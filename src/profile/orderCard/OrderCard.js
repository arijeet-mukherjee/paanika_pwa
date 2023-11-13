import React from "react";
import { Icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./OrderCard.css";
import util from "../../util/util";

function OrderCard({ dbDetail, fbDetail }) {
	let status = dbDetail && dbDetail.order_status;
	console.log(fbDetail);

	function fetchPaymentId(orderId, fbDetail) {
		let paymentReferenceId = "";
		let k = (fbDetail && Object.keys(fbDetail)) || undefined;
		k &&
			k.map((o, i) => {
				if (fbDetail[o][orderId]) {
					paymentReferenceId = fbDetail[o][orderId];
				}
			});
		return paymentReferenceId;
	}

	return (
		<div className="card__border">
			<div className="card__status">
				<div className="card__icon">
					<FontAwesomeIcon
						icon={status === "Complete" ? ["fas", "box"] : ["fas", "briefcase"]}
					/>
				</div>
				<div className="status">
					<div className="state">{status}</div>
					<div className="date">
						On {dbDetail && dbDetail.order_date} as per your
						<b>order id #{dbDetail.order_id}</b>
					</div>
					<div className="date">
						Payment Reference Id:{" "}
						<b>#{fetchPaymentId(dbDetail.order_id, fbDetail)}</b>
					</div>
				</div>
			</div>
			{dbDetail &&
				dbDetail.order_detail.map((value, i) => {
					return (
						<div className="card__details">
							<div className="card__image">
								<img
									src={
										util.imageUrl + value.product.product_gallary.gallary_name
									}
									alt="Some Image"
									style={{ height: "142px", width: "117px" }}
								/>
							</div>
							<div className="card__description">
								<h5>{value.product.detail[0].title}</h5>
								<p>₹ {value.product_price}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default OrderCard;
