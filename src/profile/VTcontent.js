import React from "react";

import "./VTcontent.css";
import ProfileLanding from "./profileLanding/ProfileLanding";
import Order from "./orderCard/Order";

function VTcontent(props) {
	let data = props.data.expData;

	return (
		<div
			key={props.index}
			className="section__Jobs-styledContent"
			style={
				props.activeTabId === props.index
					? { display: "block" }
					: { display: "none" }
			}
		>
			<h4>{data.position}</h4>
			<h5>{data.period}</h5>
			{data.id === "profile" ? (
				<ProfileLanding />
			) : data.id === "orders" ? (
				<Order />
			) : (
				data.details.map((detail) => (
					<p className="section__Jobs-detail">{detail}</p>
				))
			)}
		</div>
	);
}

export default VTcontent;
