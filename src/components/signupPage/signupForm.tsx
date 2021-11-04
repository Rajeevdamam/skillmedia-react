import React, { useState } from "react";

import signup from "../../images/signup.svg";
import { Link, useHistory } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import "./signup.css";
import { signupUser } from "../../services/services";
import { toast, ToastContainer, Zoom } from "react-toastify";
export default function Signup() {
  let [data, setData] = useState({
    name: "",
    userName: "",
    email: "",
    gender: "",
    about: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const handleChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: "1vw 1vw",
    },
    button: {
      display: "block",
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: "92%",
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const signupSubmit = async (e: any) => {
    e.preventDefault();
    let res = await signupUser(data);
    if (res) {
      toast.success('Signup successfully', {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				transition:Zoom,
				});
				setTimeout(()=> history.push("/"),2000)
    } else {
      toast.error('Signup unsuccessful', {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				transition:Zoom,
				});
    }
  };
  return (
    <div className="page">
      <div className="secure-login-svg">
        <img src={signup}></img>
      </div>
			<ToastContainer />
      <form onSubmit={signupSubmit} className="signup-form">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5vw",
            fontSize: "250%",
            color: "#534EBF",
          }}
        >
          Skill Media
        </h2>
        <div className="container-fluid">
          <div className="row ">
            <div className="col-sm-12 submit-button">
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
            </div>
          </div>
          <div className="row ">
            <div className="col-sm-12 submit-button">
              <TextField
                label="Email"
                name="email"
                autoComplete="off"
                type="text"
                onChange={handleChange}
                className={classes.margin}
                required
                value={data.email}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 submit-button">
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
									fullWidth
									name="gender"
                  open={open}
									required
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={data.gender}
                  onChange={handleChange}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 submit-button">
              <TextField
                label="About"
                name="about"
                autoComplete="off"
                type="text"
                onChange={handleChange}
                className={classes.margin}
                required
                value={data.about}
                fullWidth
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-sm-12 submit-button">
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
            </div>
          </div>

          <div className="row ">
            <div className="col-sm-12 submit-button">
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="off"
                type="password"
                onChange={handleChange}
                className={classes.margin}
                value={data.confirmPassword}
                required
                fullWidth
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-sm-12 submit-button">
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                className="sign-button"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

{
  /* <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <TextField
                label="Name"
                name="name"
                autoComplete="off"
                type="text"
                onChange={handleChange}
                className={classes.margin}
                required
                value={data.name}
              />
            </div>
            <div className="col-sm-6">
              <TextField
                label="User name"
                name="userName"
                autoComplete="off"
                type="text"
                onChange={handleChange}
                className={classes.margin}
                required
                value={data.userName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <TextField
                label="Email"
                name="email"
                autoComplete="off"
                type="text"
                onChange={handleChange}
                className={classes.margin}
                required
                value={data.email}
              />
            </div>
            <div className="col-sm-6">
              <TextField
                label="Password"
                name="password"
                autoComplete="off"
                type="password"
                onChange={handleChange}
                className={classes.margin}
                value={data.password}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                autoComplete="off"
                type="password"
                onChange={handleChange}
                className={classes.margin}
                value={data.confirmPassword}
                required
              />
            </div>
            <div className="col-sm-6">
              <TextField
                label="Password"
                name="password"
                autoComplete="off"
                type="password"
                onChange={handleChange}
                className={classes.margin}
                value={data.password}
                required
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-sm-12 submit-button">
              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                className="sign-button"
              >
                Submit
              </Button>
            </div>
          </div>
        </div> */
}
