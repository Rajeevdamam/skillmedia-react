import React, { useEffect, useState } from "react";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { displayAllPosts, getPostsByCategory } from "../../services/services";
import CardComponent from "../cardComponent/card";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { AddPostComponent } from "../addPostComponent/addPostComponent";
import Sidenav from "../sidenav/sidenav";

/* import AddComment from "./addComment"; */
import "./home.css";

export default function PostComponent() {
	let result: any;
	const dispatch = useDispatch();
	const state: any = useSelector((state: any) => state.posts);
	result = async () => {
		let data = await displayAllPosts();
		dispatch(data);
	};

	const [backToTop, setBackToTop] = useState(false);

	useEffect(() => {
		result();
	}, [state.postLikeLength, state.postLength]);

	window.onscroll = function () {
		if (document.documentElement.scrollTop > 100) {
			setBackToTop(true);
		} else {
			setBackToTop(false);
		}
	};

	const scrollTop = () => {
		let rootElement = document.documentElement;
		rootElement.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div>
			<div className="main-div">
				{/* <Sidenav /> */}
				<div className="col-m-8 posts-main-div">
					<div className="main-container">
						<AddPostComponent></AddPostComponent>
						<div className="posts-div">
							{!state.posts.length && <Empty style={{ margin: "10% auto" }} />}
							{state.posts.map((value: any, index: any) => {
								return (
									<div className="post-card">
										<CardComponent
											data={value}
											flag={state.loggedInUser}
										></CardComponent>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			{backToTop ? (
				<div className="backToTop" onClick={scrollTop}>
					<ArrowUpwardIcon
						style={{ color: "#534edf", fontSize: 40 }}
					></ArrowUpwardIcon>
				</div>
			) : null}
		</div>
		// <div className="main-container">
		// 	<AddPostComponent />
		// 	<div className="posts-div">
		// 		{!state.posts.length && <Empty style={{ margin: "10% auto" }} />}
		// 		{state.posts.map((value: any, index: any) => {
		// 			return (
		// 				<div className="post-card">
		// 					<CardComponent
		// 						data={value}
		// 						flag={state.loggedInUser}
		// 					></CardComponent>
		// 				</div>
		// 			);
		// 		})}
		// 	</div>
		// </div>
	);
}
