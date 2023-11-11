import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import "./Order.css";
import OrderCard from "./OrderCard";
import Util from "../../util/util";

function Order(props) {
	const state = useSelector((state) => state);
	const [userOrder, setUserOrder] = useState([]);
	function GetAllOrders() {
		let header = Util.header;
		header["Authorization"] =
			state.user &&
			state.user.currentUser &&
			state.user.currentUser.token &&
			`Bearer ${state.user.currentUser.token}`;

		Util.apiCall("GET", Util.baseUrl, `customer/order`, header)
			.then((dt) => {
				console.log(dt, "User Orders");
				setUserOrder(dt.data);
			})
			.catch((e) => {
				//console.log('this error')
				console.log(e);
			});
	}

	useEffect(() => {
		GetAllOrders();
	}, []);
	return (
		<div className="order__outerbox">
			<OrderCard />
		</div>
	);
}

export default Order;
