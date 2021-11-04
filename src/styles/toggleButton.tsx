import React from "react";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";

interface Iprops {
	theme: any;
	toggleTheme: any;
}

export default function ToggleButton(props: Iprops) {
	return (
		<div
			style={{ cursor: "pointer", display: "inline-block", margin: "auto" }}
			onClick={props.toggleTheme}
		>
			{props.theme === "dark" ? (
				<WbSunnyOutlinedIcon style={{ color: "gold" }} />
			) : (
				<NightsStayIcon style={{ color: "blue" }} />
			)}
		</div>
	);
}
