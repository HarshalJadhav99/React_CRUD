import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate,Link } from "react-router-dom";

const User = () => {
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
	});
	const { id } = useParams();
	useEffect(() => {
		loadUser();
	}, []);
	const loadUser = async () => {
		const res = await axios.get(`http://localhost:3003/users/${id}`);
		setUser(res.data);
	};
	return (
		<>
			<div className="container py-3">
				
				<h1 className="display-4">User Info</h1>
				<hr />
				<ul className="list-group">
					<li className="list-group-item">Name: {user.name}</li>
					<li className="list-group-item">UserName: {user.username}</li>
					<li className="list-group-item">Email: {user.email}</li>
				</ul>
				<Link className="btn btn-outline-primary ml-0 my-3" to="/">
					Back To Home
				</Link>
			</div>
		</>
	);
};

export default User;
