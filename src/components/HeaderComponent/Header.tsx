import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Popover } from "antd";
import { FormControl } from "react-bootstrap";
import "./header.css";

import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import { PoweroffOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import ToggleBtn from "../../styles/toggleButton";
import { useDarkTheme } from "../../styles/useDarkTheme";

import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "../../styles/globalStyles";
import { Avatar } from "@material-ui/core";

// npm i antd @types/antd @ant-design/icons mdb-react-ui-kit react-bootstrap

export default function Header() {
	const history = useHistory();
	const dispatch = useDispatch();
	const state: any = useSelector((state: any) => state.user);
	const name = localStorage.getItem("user");
	const [theme, toggleTheme] = useDarkTheme();
	const themeMode = theme === "light" ? lightTheme : darkTheme;

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("userId");

		dispatch({
			type: "LOGOUT",
			payload: "",
		});
		history.push("/");
	};

	const content = (
		<div>
			<p>
				<Link className="link-tag" to="/myprofile">
					Profile
				</Link>
			</p>
			<p>
				<ToggleBtn theme={theme} toggleTheme={toggleTheme}></ToggleBtn>
			</p>

			<p>
				<PoweroffOutlined
					onClick={logout}
					title="Logout"
					style={{
						fontSize: "20px",
						color: "red",
						cursor: "pointer",
					}}
				/>
			</p>
		</div>
	);

	let [searchText, setsearchText] = useState("");

	const setCategoryValue = (e: any) => {
		if (e.charCode === 13 && searchText.startsWith("@")) {
			setsearchText("");
			history.push("/search?q=" + searchText);
		}
	};

	const setValue = (e: any) => {
		let value: any = e.target?.value;
		setsearchText(value);
	};

	return (
		<ThemeProvider theme={themeMode}>
			<GlobalStyles></GlobalStyles>
			<div className="fix-header">
				<MDBNavbar sticky={true} expand="lg" light>
					<MDBContainer fluid>
						<div className="container-fluid">
							<div className="row">
								<div className=" col-sm-3 col-3">
									<MDBNavbarBrand>
										<Link className="link-tag" to="/home" title="Home">
											Skill Media
										</Link>
									</MDBNavbarBrand>
								</div>
								<div className="col-sm-6 col-8">
									<div
										style={{
											display: "grid",
											margin: "auto auto",
										}}
									>
										<FormControl
											type="text"
											placeholder="Search"
											className="mr-sm-1 search-input"
											value={searchText}
											onChange={setValue}
											onKeyPress={setCategoryValue}
										/>
									</div>
								</div>
								<div className="col-sm-3 col-1" style={{ margin: "auto" }}>
									{localStorage.getItem("userID") && (
										<Popover
											content={content}
											title={state.user}
											trigger="click"
											style={{ width: "30%" }}
										>
											<Avatar
												style={{
													backgroundColor: "#534edf",
													float: "right",
													cursor: "pointer",
												}}
											>{`${name?.split("")[0].toUpperCase()}`}</Avatar>
										</Popover>
									)}
								</div>
							</div>
						</div>
					</MDBContainer>
				</MDBNavbar>
			</div>
		</ThemeProvider>
	);
}
