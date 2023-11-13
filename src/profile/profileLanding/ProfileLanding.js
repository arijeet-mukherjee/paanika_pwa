import React from "react";
import "./landing.css";
import { useSelector } from "react-redux";

function ProfileLanding(props) {
	const state = useSelector((state) => state);
	return (
		<div className="outerbox">
			<div className="details">
				<div className="node">
					<label>Mobile Number</label>
					<p>{state.user && state.user.currentUser ? state.user.currentUser.mobile : "XXXXX XXXXX"}</p>
				</div>
				<div className="node">
					<label>Full Name</label>
					<p>{state.user && state.user.currentUser ? state.user.currentUser.fullname : "Test Developer" }</p>
				</div>
				<div className="node">
					<label>Email Id</label>
					<p>{state.user && state.user.currentUser ? state.user.currentUser.email : "test@email.com"}</p>
				</div>
				<div className="node">
					<label>Date of birth</label>
					<p>Not Added</p>
				</div>
				<div className="node">
					<label>Location</label>
					<p>Not Added</p>
				</div>
				<div className="node">
					<label>Alternate Mobile</label>
					<p>Not Added</p>
				</div>
			</div>
		</div>
	);
}

export default ProfileLanding;
