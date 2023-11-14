import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Util from "../../util/util";
import axios from "axios";
import { setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
	SignInContainer,
	SignInTitle,
	ButtonsBarContainer,
} from "./sign-in.styles";

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			fullname: "",
			userid: "",
			token: "",
		};
	}

	processLogin = async (email, password) => {
		var formdata = new FormData();
		formdata.append("email", email);
		formdata.append("password", password);

		var configLogin = {
			method: "post",
			url: Util.baseUrl + "customer_login",
			headers: Util.header,
			data: formdata,
		};
		axios(configLogin)
			.then((response) => response.data)
			.then((data) => {
				if (data.data.status === "1") {
					this.setState({
						fullname: data.data.first_name + " " + data.data.last_name,
						userid: data.data.id,
						token: data.data.token,
					});

					this.props.setCurrentUser(this.state);
				} else {
					window.alert("Credentials doesnot work!!");
				}
				//setIsLoading(false);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			//await auth.signInWithEmailAndPassword(email, password);
			await this.processLogin(email, password);

			//this.setState({ email: "", password: "" });
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (event) => {
		const { value, name } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		return this.props.currentUser.user.currentUser ? (
			<Redirect to="/" />
		) : (
			<SignInContainer>
				<SignInTitle>I already have an account</SignInTitle>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name="email"
						type="email"
						handleChange={this.handleChange}
						value={this.state.email}
						label="email"
						required
					/>
					<FormInput
						name="password"
						type="password"
						value={this.state.password}
						handleChange={this.handleChange}
						label="password"
						required
					/>
					<ButtonsBarContainer>
						<CustomButton type="submit"> Sign in </CustomButton>
					</ButtonsBarContainer>
				</form>
			</SignInContainer>
		);
	}
}
const mapStateToProps = (state) => {
	return { currentUser: state };
};

export default connect(mapStateToProps, { setCurrentUser })(SignIn);
