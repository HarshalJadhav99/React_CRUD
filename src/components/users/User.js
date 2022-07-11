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
		<section className="mb-4">
				<nav className="navbar navbar-expand-lg bg-light">
					<div className="container-fluid">
						<Link className="navbar-brand" to='/'>
							CRUD
						</Link>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<Link className="nav-link active" aria-current="page" to="/">
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/">
										User
									</Link>
								</li>
							</ul>
							<form
								className="d-flex input-group w-auto"
								>
								<input
									type="text"
									className="form-control"
									placeholder="Search"
									
								/>
								<button type="submit" className="btn btn-outline-primary mx-2">
									Search
								</button>
								<button
									className="btn btn-outline-primary"
									>
									Reset
								</button>
							</form>
						</div>
					</div>
				</nav>
			</section>
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
