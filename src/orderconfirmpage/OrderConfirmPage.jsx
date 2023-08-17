import { Link } from "react-router-dom";
//import Product from "../products/Product";
//import ProductH from "../products/ProductH";
import Productcard from "../components/productcard/Productcard";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import Util, { initiatePayment } from "../util/util";
import Spinner from "../util/spinner";
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import s from "./OrderConfirmPage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { selectCartTotal } from "../redux/cart/cart.selectors";
import PaymentStatus from "./paymentStatus";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import util from "../util/util";

function OrderConfirmPage(props) {
	const history = useHistory();
	const [isLoading, setLoading] = useState(false);
	const [responseData, setResponseData] = useState(null);
	const [intervalId, setIntervalId] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	const [fdata, setFdata] = useState({
		billing_first_name: "",
		billing_last_name: "",
		billing_street_aadress: "",
		billing_city: "",
		billing_postcode: "",
		billing_country: null,
		billing_state: "",
		billing_phone: "",
		delivery_first_name: "",
		delivery_last_name: "",
		delivery_street_aadress: "",
		delivery_city: "",
		delivery_postcode: "",
		delivery_country: "",
		delivery_state: "",
		delivery_phone: "",
		currency_id: "",
		language_id: "",
		session_id: "",
		payment_method: "",
		latlong: "",
		payment_id: "",
		cc_cvc: "",
		cc_expiry_month: "",
		cc_expiry_year: "",
		cc_number: "",
	});

	const [country, setCountry] = useState([]);

	function handleStateChange(fieldName, fieldValue) {
		setFdata({ ...fdata, [fieldName]: fieldValue });
		console.log(fdata);
	}

	const apiCall = async () => {
		fdata["delivery_street_aadress"] = fdata.billing_street_aadress;
		const config = {
			method: "POST",
			url: "http://admin.paanika.com/api/client/order",
			headers: {
				clientsecret: "sk_1234",
				clientid: "1234",
				"Access-Control-Allow-Origin": "*",
			},
			data: fdata ? fdata : "",
		};

		const result = await axios(config)
			.then((response) => response.data)
			.then((data) => {
				console.log(data);
			})
			.catch((e) => console.log(e));
	};

	const getPaymentConfirmation = async () => {
		if (responseData === null) {
			console.log("121212121");
			try {
				const response = await axios.get(
					"http://localhost:4000/payment/getPaymentConfirmation"
				);

				// Check if the response is empty
				if (response.data !== null && Object.keys(response.data).length > 0) {
					setResponseData(response.data);
					setIsFetching(false);
					console.log("payment data : ", response.data);
					history.push({ pathname: "paymentstatus", state: response });
				} else {
					// If the response is empty, recursively call the getPaymentConfirmation function
					setTimeout(() => {
						getPaymentConfirmation();
					}, 7000);
				}
			} catch (error) {
				console.error(error);
				// Handle the error here
			}
		}
	};

	const loadHandler = () => {
		if (
			fdata.billing_state !== "" &&
			fdata.billing_street_aadress !== "" &&
			fdata.billing_city !== "" &&
			fdata.billing_country !== "" &&
			fdata.billing_first_name !== "" &&
			fdata.billing_phone !== "" &&
			fdata.billing_postcode !== ""
		) {
			setLoading(true);
			setTimeout(() => {
				if (!isFetching) {
					setIsFetching(true);
					//  const intervalId2 = setInterval(getPaymentConfirmation , 15000);
					//  console.log(intervalId2, "From loadHandler");
					//  setIntervalId(intervalId2);
					getPaymentConfirmation();
				}
			}, 7000);
		}
	};

	const getAllCountries = async () => {
		await Util.apiCall(
			"GET",
			Util.baseUrl,
			`country?limit=1000&getStates=1`,
			Util.header
		)
			.then((dt) => {
				console.log(dt, "sucess wala");
				setCountry(dt.data);
			})
			.catch((e) => {
				console.log("this error");
				console.log(e);
			});
	};

	const [randomOrder, setRandomOrder] = useState();

	function generateRandomOrderId() {
		let id = util.generateString(4) + util.getCurrentDateTime();
		setRandomOrder(id);
	}

	useEffect(() => {
		getAllCountries();
		generateRandomOrderId();
	}, []);

	return (
		<>
			<div
				class="ordercontainer"
				style={{ display: `${isLoading ? "" : "none"}`, position: "relative" }}
			>
				<Spinner />
				<div style={{ position: "relative" }}>
					<span style={{ fontSize: "16px", overflow: "hidden" }}>
						<b>
							Awaiting Payment Confirmation,
							<br /> Don't refresh the page...{" "}
						</b>
					</span>
				</div>
				<br />
				<br />
			</div>
			<div
				class="ordercontainer"
				style={{ display: `${!isLoading ? "" : "none"}` }}
			>
				<div class="title-order">
					<h2>Complete My Order</h2>
				</div>
				<div class="d-flex-order">
					<form
						action="http://127.0.0.1:4000/payment/ccavRequestHandler"
						method="POST"
						target="_blank"
						class="form-order"
					>
						<input
							name="merchant_id"
							id="merchant_id"
							value="2531097"
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="order_id"
							value={randomOrder}
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="order_no"
							value={randomOrder}
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="currency"
							value="INR"
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="amount"
							value={`${props.total}` + ".00"}
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="redirect_url"
							value="http://localhost:4000/payment/ccavResponseHandler"
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="cancel_url"
							value="http://localhost:4000/payment/ccavResponseHandler"
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="language"
							id="language"
							value="EN"
							style={{ display: "none" }}
						/>
						<label class="label-order">
							<span class="fname">
								Name <span class="required">*</span>
							</span>
							<input
								type="text"
								name="billing_name"
								class="order-input"
								onChange={(e) =>
									handleStateChange("billing_first_name", e.target.value)
								}
							/>
						</label>
						<label class="label-order">
							<span>
								Country <span class="required">*</span>
							</span>
							<select
								name="billing_country"
								class="order-select"
								required
								onChange={(e) =>
									handleStateChange("billing_country", Number(e.target.value))
								}
								value={fdata.billing_country}
							>
								<option value="select">Select your country...</option>
								{country
									? country.map((v, i) => {
											return (
												<option value={v.country_id}>{v.country_name}</option>
											);
									  })
									: ""}
							</select>
						</label>
						<label class="label-order">
							<span>
								State<span class="required">*</span>
							</span>
							<select
								name="billing_state"
								class="order-select"
								required
								onChange={(e) =>
									handleStateChange("billing_state", Number(e.target.value))
								}
								value={fdata.billing_state}
							>
								<option value="select">Select your state...</option>
								{/* <input type="text" class="order-input" name="billing_state" onChange={e => handleStateChange(e.target.name, e.target.value)}/>  */}
								{fdata.billing_country !== null && country
									? country[fdata.billing_country - 1].states.map((v, i) => {
											return <option value={v.id}>{v.name}</option>;
									  })
									: ""}
							</select>
						</label>
						<label class="label-order">
							<span>
								Street Address <span class="required">*</span>
							</span>
							<input
								type="text"
								class="order-input"
								name="billing_address"
								placeholder="House number and street name"
								required
								onChange={(e) =>
									handleStateChange("billing_street_aadress", e.target.value)
								}
							/>
						</label>
						<label class="label-order">
							<span>
								Town / City <span class="required">*</span>
							</span>
							<input
								type="text"
								class="order-input"
								name="billing_city"
								onChange={(e) =>
									handleStateChange(e.target.name, e.target.value)
								}
							/>
						</label>
						<label class="label-order">
							<span>
								Postcode / ZIP <span class="required">*</span>
							</span>
							<input
								type="text"
								class="order-input"
								name="billing_zip"
								onChange={(e) =>
									handleStateChange("billing_postcode", e.target.value)
								}
							/>
						</label>
						<label class="label-order">
							<span>
								Phone <span class="required">*</span>
							</span>
							<input
								type="tel"
								class="order-input"
								name="billing_tel"
								onChange={(e) =>
									handleStateChange("billing_phone", Number(e.target.value))
								}
							/>
						</label>
						<label class="label-order">
							<span>
								Email Address <span class="required">*</span>
							</span>
							<input class="order-input" type="email" name="billing_email" />
						</label>

						<input
							TYPE="submit"
							value="Checkout"
							class="btn-order"
							onClick={loadHandler}
						/>
					</form>
					<div class="Yorder">
						<table class="table-order">
							<tr>
								<th colspan="2">Your order</th>
							</tr>
							<tr>
								<td>Product Name x 2(Qty)</td>
								<td>₹{props.total}</td>
							</tr>
							<tr>
								<td>Subtotal</td>
								<td>₹{props.total}</td>
							</tr>
							<tr>
								<td>Shipping</td>
								<td>Free shipping</td>
							</tr>
						</table>
						<br />
						<div>
							<input type="radio" name="dbt" value="dbt" checked /> Direct Bank
							Transfer
						</div>
						<p>
							Make your payment directly into our bank account. Please use your
							Order ID as the payment reference. Your order will not be shipped
							until the funds have cleared in our account.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = createStructuredSelector({
	total: selectCartTotal,
});

export default connect(mapStateToProps)(OrderConfirmPage);
