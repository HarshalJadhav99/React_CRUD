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
			<div className="container">
				<Link className="btn btn-primary" to="/">
					Back To Home
				</Link>
				<h1 className="display-4">User Id:{id}</h1>
				<hr />
				<ul className="list-group w-50">
					<li className="list-group-item">Name: {user.name}</li>
					<li className="list-group-item">UserName: {user.username}</li>
					<li className="list-group-item">Email: {user.email}</li>
				</ul>
			</div>
		</>
	);
};

export default User;
