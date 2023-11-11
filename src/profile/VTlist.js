import React from "react";

import "./VTlist.css";

function VTlist(props) {
	const Clicked = () => {
		props.onClick(props.index);
	};

	return (
		<li
			key={props.index}
			style={{ listStyle: "none", textAlign: "left", marginLeft: "3px" }}
		>
			<button
				className="section__Jobs-buttonCompany"
				onClick={Clicked}
				style={
					props.activeTabId === props.index
						? { color: "#9E0449" }
						: { color: "#8892b0" }
				}
			>
				{props.data.expData.tab}
			</button>
		</li>
	);
}

export default VTlist;
