import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Util from "../../util/util";
import axios from "axios";
import {setCurrentUser} from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import { SignUpContainer, SignUpTitle } from "./sign-up.styles";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      firstname: "",
      lastname : "",
      userid : "",
      contactnumber :"",
      email: "",
      password: "",
      confirmPassword: "",
      token:""
    };
  }

  processSignUP = async (email, password , firstname, lastname, contactnumber) =>{
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("confirm_password", password);
    formdata.append("first_name", firstname);
    formdata.append("last_name", lastname);
    formdata.append("status", "1");
    formdata.append("session_id",  Util.generateString(14));
    
    var configRegistration = {
      method: 'post',
      url: Util.baseUrl + 'customer_register',
      headers: Util.header,
      data: formdata
    };
    axios(configRegistration)
      .then((response) => response.data)
      .then((data) => {
        console.log(data.data);
        if(data.data.status==="1"){
          this.setState({ fullname : data.data.first_name + " " + data.data.last_name , userid  : data.data.id , token : data.data.token});
          
          this.props.setCurrentUser(this.state); 
        }
        else{
          window.alert("Something is wrong!! User may exist.");
        }
        //setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { firstname,lastname, email, contactnumber, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
       await this.processSignUP(
        email,
        password,
        firstname,
        lastname,
        contactnumber
      ); 

      

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { firstname,lastname, email, contactnumber, password, confirmPassword } = this.state;
    return this.props.currentUser.user.currentUser? <Redirect to="/" />:(
      <SignUpContainer>
        <SignUpTitle>I do not have a account</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="firstname"
            value={firstname}
            onChange={this.handleChange}
            label="First Name"
            required
          />
          <FormInput
            type="text"
            name="lastname"
            value={lastname}
            onChange={this.handleChange}
            label="Last Name"
            required
          />
          <FormInput
            type="text"
            name="contactnumber"
            value={contactnumber}
            onChange={this.handleChange}
            label="Contact Number"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </SignUpContainer>
    );
  }
}
const mapStateToProps = state => {
  return { currentUser: state };
};


export default  connect(mapStateToProps,{setCurrentUser})(SignUp);
