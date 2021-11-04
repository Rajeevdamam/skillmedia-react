import React, { useEffect } from "react";
import { Divider, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	currentUserProfile,
	currentUserPosts,
	searchedUserPosts,
} from "../../services/services";
import "./profile.css";
import { Empty } from "antd";
import CardComponent from "../cardComponent/card";
import WcIcon from "@material-ui/icons/Wc";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useLocation, useParams } from "react-router";
import EditIcon from "@material-ui/icons/Edit";

function Profile() {
	const dispatch = useDispatch();
	const params: any = useParams();
	const state = useSelector((state: any) => state.user);
	const postsState = useSelector((state: any) => state.posts);
	const location: any = useLocation();
	const obj = location?.state || "";
	useEffect(() => {
		if (params.userName) {
			currentUserProfile(obj.userid).then((res) => {
				dispatch(res);
			});
			searchedUserPosts(params.userName).then((res: any) => {
				dispatch(res);
			});
		} else {
			currentUserProfile(localStorage.getItem("userID")).then((res) => {
				dispatch(res);
			});
			currentUserPosts(localStorage.getItem("userID")).then((res) => {
				dispatch(res);
			});
		}
	}, [postsState.postLength, location.state]);

	return (
		<div>
			<div className="container profile-card">
				{location.state == undefined && (
					<div
						className="d-flex justify-content-end"
						style={{ marginRight: "10px" }}
					>
						<div>
							<EditIcon style={{ color: "gray" }} />
						</div>
					</div>
				)}
				<div className="row">
					<div className="col-sm-5">
						<div className="image-div">
							{state.userProfile.profileImage ? (
								<Image
									className="profile-image"
									src={state.userProfile.profileImage}
									alt="profile"
								/>
							) : (
								<Image
									className="profile-image"
									src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
									alt="profile"
								/>
							)}
						</div>
					</div>
					<div className="col-sm-7 profile-details-div">
						<div className="d-flex flex-column">
							<div className="user-details-div">
								<AccountCircleIcon className="position-icon"></AccountCircleIcon>
								<span className="user-name">{state.userProfile.userName}</span>
							</div>
							<div className="d-flex justify-content user-details-div">
								<div style={{ marginRight: "30px", marginLeft: "12px" }}>
									<EmailIcon style={{ color: "gray" }}></EmailIcon>
									<span className="user-details">
										{state.userProfile.email}
									</span>
								</div>
								<div>
									<WcIcon style={{ color: "gray" }}></WcIcon>
									<span className="user-details">
										{state.userProfile.gender}
									</span>
								</div>
							</div>
							<div className="user-details-div" style={{ marginLeft: "12px" }}>
								<p className="user-details">{state.userProfile.about}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{location.state === undefined ? (
				<Divider
					className="divider"
					orientation="center"
					style={{ margin: "50px 0px", fontSize: "30px" }}
				>
					My Posts
				</Divider>
			) : (
				<Divider
					className="divider"
					orientation="center"
					style={{ margin: "50px 0px", fontSize: "30px" }}
				>
					Posts
				</Divider>
			)}
			<div className="main-container">
				<div className="posts-div">
					{!state.userPosts.length && <Empty style={{ margin: "10% auto" }} />}
					{state.userPosts.map((value: any, index: any) => {
						return (
							<div className="post-card">
								<CardComponent
									data={value}
									flag={state.loggedInUser}
									type={value.users._id}
								></CardComponent>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Profile;
