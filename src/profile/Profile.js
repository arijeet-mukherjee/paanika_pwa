import { connect } from "react-redux";
import { Component } from "react";
import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "./Profile.css";
import VTlist from "./VTlist";
import VTcontent from "./VTcontent";
import { useSelector } from "react-redux";

function Profile(props) {
	const state = useSelector((state) => state);
	const [activeTabId, setActiveTabId] = useState(0);
	const tabsDetails = {
		tabs: [
			{
				expData: {
					tab: "Orders",
					position: "Order Details",
					period: "All pending and processed orders",
					id: "orders",
					details: [
						"Suspendisse potenti. Vestibulum aliquam luctus sem, at feugiat felis. Pellentesque dignissim lorem eu ipsum condimentum varius. ",
						"Nam vehicula pretium arcu. Nam venenatis ante et porta pellentesque.",
					],
				},
			},
			{
				expData: {
					tab: "Account Overview",
					position: (state.user && state.user.currentUser ? state.user.currentUser.fullname.toUpperCase() : "Test Developer".toUpperCase()),
					period: "Profile Details",
					id: "profile",
					details: [
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim fringilla dui ac mattis.",
						"Donec in sodales eros. Nulla fermentum, ante in venenatis pellentesque, justo odio viverra lorem, varius posuere erat tortor et magna.",
					],
				},
			},
			{
				expData: {
					tab: "Saved Details",
					position: "Your saved details",
					period: "Addresses and more",
					details: ["No records found 🤦‍♂️ 🤦‍♀️"],
				},
			},
		],
	};

	function btnClick(id) {
		setActiveTabId(id);
	}

	return (
		<div className="outerbox">
			<Container className="section__Jobs-container">
				<Row>
					<Col sm="3">
						<div className="section__Jobs-styledTab">
							<ul className="section__Jobs-styledTabList">
								{tabsDetails.tabs.map((job, index) => (
									<VTlist
										key={index}
										onClick={btnClick}
										data={job}
										index={index}
										activeTabId={activeTabId}
									/>
								))}
							</ul>
						</div>
					</Col>
					<Col sm="9">
						{tabsDetails.tabs.map((job, index) => (
							<VTcontent
								data={job}
								key={index}
								index={index}
								activeTabId={activeTabId}
							/>
						))}
					</Col>
				</Row>
				<span
					className={
						activeTabId === 0
							? "index1-chosen"
							: activeTabId === 1
							? "index2-chosen"
							: "index3-chosen"
					}
				>
					&nbsp;
				</span>
			</Container>
		</div>
	);
}
export default Profile;
