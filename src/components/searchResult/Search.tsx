import { Avatar } from "@material-ui/core";
import { List } from "antd";
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getUsersByName } from "../../services/services";
import "./search.css";
import { Divider } from "antd";

interface Props {}

export default function Search({}: Props) {
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	const dispatch = useDispatch();
	const history = useHistory();
	const userState = useSelector((state: any) => state.user);
	const name = params.get("q")?.slice(1);
	useEffect(() => {
		getUsersByName(name).then((res) => {
			dispatch(res);
		});
	}, [params]);
	const handleClick = async (id: any, username: any) => {
		history.push("/profile/" + username, {
			userid: id,
			userName: username,
		});
	};
	return (
		<div>
			<div>
				<Divider
					className="divider"
					orientation="center"
					style={{ margin: "30px 0px", fontSize: "15px" }}
				>
					Searched Results
				</Divider>
				<List
					itemLayout="horizontal"
					dataSource={userState.searchedUsers}
					className="profile-list"
					renderItem={(item: any) => (
						<List.Item onClick={() => handleClick(item._id, item.userName)}>
							<List.Item.Meta
								avatar={
									<Avatar
										style={{
											backgroundColor: "#534edf",
											float: "right",
											cursor: "pointer",
											color: "#ffffff",
										}}
									>{`${item.userName?.split("")[0].toUpperCase()}`}</Avatar>
								}
								title={<div>{item.userName}</div>}
								description={`${item.email}`}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
}
