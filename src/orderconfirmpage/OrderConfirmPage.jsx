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
import { getDatabase, ref, push, set } from "firebase/database";
import { selectCartItems, selectCartTotal } from "../redux/cart/cart.selectors";
import { selectCurrentUser } from "../redux/user/user.selectors";
import PaymentStatus from "./paymentStatus";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import util, { getOrderStatus, initializeFirebase } from "../util/util";
import { useSelector } from "react-redux";

function OrderConfirmPage(props) {
	const history = useHistory();
	const [isLoading, setLoading] = useState(false);
	const [responseData, setResponseData] = useState(null);
	const [intervalId, setIntervalId] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const state = useSelector((state) => state);

	const [fdata, setFdata] = useState({
		billing_first_name: "N/A",
		billing_last_name: "N/A",
		billing_street_aadress: "N/A",
		billing_city: "N/A",
		billing_postcode: "N/A",
		billing_country: null,
		billing_state: "N/A",
		billing_phone: "N/A",
		delivery_first_name: "N/A",
		delivery_last_name: "N/A",
		delivery_street_aadress: "N/A",
		delivery_city: "N/A",
		delivery_postcode: "N/A",
		delivery_country: "N/A",
		delivery_state: "N/A",
		delivery_phone: "N/A",
		currency_id: 1,
		language_id: "N/A",
		session_id: "N/A",
		payment_method: "cod",
		latlong: "N/A",
		payment_id: 4,
		cc_cvc: 123,
		cc_expiry_month: 0,
		cc_expiry_year: 2040,
		cc_number: 123,
	});

	const [country, setCountry] = useState([]);

	function handleStateChange(fieldName, fieldValue) {
		setFdata({ ...fdata, [fieldName]: fieldValue });
	}

	const [cartObject, setCartObject] = useState({});
	let navigate = useHistory();
	const routeChange = (path) => {
		navigate.push(path);
	};

	function buildCartObject() {
		const cartObject = {};
		props.cartItems &&
			props.cartItems.map((item) => {
				cartObject[item.product_id] = item.quantity;
			});

		setCartObject({
			token: props.user && props.user.token,
			cartObject: cartObject,
		});
	}

	function setToFirebase(bankAndDatabaseOrderIdmap) {
		const db = getDatabase();
		push(ref(db), bankAndDatabaseOrderIdmap);
	}

	const placeOrder = async () => {
		return new Promise(async (resolve, reject) => {
			fdata["delivery_street_aadress"] = fdata.billing_street_aadress;
			fdata["billing_phone"] = fdata.billing_phone.toString();
			fdata["delivery_phone"] = fdata.delivery_phone.toString();
			fdata["delivery_country"] = fdata.billing_country;
			fdata["delivery_state"] = fdata.billing_state;
			let config = {
				method: "POST",
				url: "http://admin.paanika.com/api/client/order",
				headers: {
					clientsecret: "sk_1234",
					clientid: "1234",
					"Access-Control-Allow-Origin": "*",
					Authorization:
						state.user &&
						state.user.currentUser &&
						state.user.currentUser.token &&
						`Bearer ${state.user.currentUser.token}`,
				},
				data: fdata ? fdata : "",
			};

			await axios(config)
				.then((response) => response.data)
				.then((data) => {
					resolve(data);
				})
				.catch((e) => {
					reject(e);
				});
		});
	};

	const [buttonDisable, setButtonDisable] = useState(true);

	function redirect_checker() {
		if (
			fdata.billing_state &&
			fdata.billing_first_name &&
			fdata.billing_city &&
			fdata.billing_country &&
			fdata.billing_phone &&
			fdata.billing_street_aadress &&
			fdata.billing_postcode
		) {
			setButtonDisable(false);
		}
	}

	useEffect(() => redirect_checker(), [fdata]);

	const getPaymentConfirmation = async () => {
		if (responseData === null) {
			try {
				const response = await axios.get(
					"http://payment.paanika.com:4000/payment/getPaymentConfirmation"
				);

				// Check if the response is empty
				if (response.data !== null && Object.keys(response.data).length > 0) {
					setResponseData(response.data);
					setIsFetching(false);
					if (response.data && response.data.success) {
						placeOrder()
							.then((data) => {
								const orderId = (data && data.data && data.data.order_id) || "";
								if (orderId === "") {
									response.data.success = false;
								} else {
									const savePaymentDataToFirebase = {
										payment: {},
									};
									savePaymentDataToFirebase.payment[orderId] = {
										...response.data,
									};
									const bankAndDatabaseOrderIdmap = {};
									bankAndDatabaseOrderIdmap[orderId] = randomOrder;
									setToFirebase(bankAndDatabaseOrderIdmap);
									setToFirebase(savePaymentDataToFirebase);
									history.push({ pathname: "paymentstatus", state: response });
								}
							})
							.catch((e) => {
								response.data.success = false;
								history.push({ pathname: "paymentstatus", state: response });
							});
					} else {
						history.push({ pathname: "paymentstatus", state: response });
					}
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
		if (!cartObject.token) {
			routeChange("/signin");
		}
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
				setCountry(dt.data);
			})
			.catch((e) => {
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
		buildCartObject();
		initializeFirebase();
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
						action="http://payment.paanika.com:4000/payment/ccavRequestHandler"
						method="POST"
						target="_blank"
						class="form-order"
					>
						<input
							name="merchant_id"
							id="merchant_id"
							value="2537849"
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
							name="cartObject"
							value={JSON.stringify(cartObject)}
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="redirect_url"
							value="http://payment.paanika.com:4000/payment/ccavResponseHandler"
							style={{ display: "none" }}
						/>
						<input
							type="text"
							name="cancel_url"
							value="http://payment.paanika.com:4000/payment/ccavResponseHandler"
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
							disabled={buttonDisable}
							onClick={loadHandler}
						/>
					</form>
					<div class="Yorder">
						<table class="table-order">
							<tr>
								<th colspan="2">Your order</th>
							</tr>
							<tr>
								<td>
									Total Products: {props.cartItems && props.cartItems.length}
								</td>
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
	cartItems: selectCartItems,
	user: selectCurrentUser,
});

export default connect(mapStateToProps)(OrderConfirmPage);
