import React, { useState } from "react";
import { Button, Container, makeStyles, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import mylogin from "../../images/login.svg";
import "./login.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer, Zoom } from "react-toastify";

export default function Login() {
	let [data, setData] = useState({
		userName: "",
		password: "",
	});
	const state = useSelector((state: any) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const handleChange = (e: any) => {
		let name = e.target.name;
		let value = e.target.value;
		setData({ ...data, [name]: value });
	};
	const useStyles = makeStyles((theme) => ({
		margin: {
			display: "block",
			margin: "1vw 0vw",
			width: 250,
			marginLeft: "auto",
			marginRight: "auto",
		},
	}));
	const classes = useStyles();

	const login = async (e: any) => {
		e.preventDefault();
		let result: any = await loginUser(data);
		if (result) {
			dispatch(result);
			toast.success("Login successful", {
				position: "top-center",
				autoClose: 1500,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				transition: Zoom,
			});
			setTimeout(() => history.push("/home"), 1500);
		} else {
			toast.error("Invalid username or password", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				transition: Zoom,
			});
		}
	};
	console.log("login page");

	return (
		<div className="page">
			<div className="secure-login-svg">
				<img src={mylogin} alt="login"></img>
			</div>
			<ToastContainer></ToastContainer>
			<form onSubmit={login} className="login-form">
				<Container className="container">
					<h2
						style={{
							textAlign: "center",
							marginBottom: "25%",
							fontSize: "250%",
							color: "#534EBF",
						}}
					>
						Skill Media
					</h2>
					<TextField
						label="User name"
						name="userName"
						autoComplete="off"
						type="text"
						onChange={handleChange}
						className={classes.margin}
						required
						value={data.userName}
						fullWidth
					/>
					<TextField
						label="Password"
						name="password"
						autoComplete="off"
						type="password"
						onChange={handleChange}
						className={classes.margin}
						value={data.password}
						required
						fullWidth
					/>
					<div className="button-placement">
						<Button
							variant="contained"
							size="large"
							color="primary"
							type="submit"
							className="button"
						>
							Login
						</Button>
					</div>
					<div style={{ marginTop: "2vw", textAlign: "center" }}>
						{"Not a user? "}
						<Link to="/signup" className="link">
							Sign Up
						</Link>
					</div>
				</Container>
			</form>
		</div>
	);
}
