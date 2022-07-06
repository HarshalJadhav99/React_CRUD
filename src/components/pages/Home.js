import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddUser from "../users/AddUser";
const Home = () => {
	const [users, setUser] = useState([]);
	const [value, setValue] = useState("");
	const [sortValue, setSortValue] = useState("");

	const sortOptions = ["name", "username", "email"];

	useEffect(() => {
		loadUsers();
	}, []);
	const loadUsers = async () => {
		const result = await axios.get("http://localhost:3003/users");
		setUser(result.data);
	};
	const deleteUser = async (id) => {
		await axios.delete(`http://localhost:3003/users/${id}`);
		loadUsers();
	};
	

	return (
		<>
			<section>
				<div className="container">
					<div className="row">
						<h1>Home Page</h1>
						
						<table class="table table-hover border shadow">
							<thead className="table-dark">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Name</th>
									<th scope="col">UserName</th>
									<th scope="col">Email</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								{users.length === 0 ? (
									<tr>
										<td colSpan={8} className="text-center mb-0">
											No data found
										</td>
									</tr>
								) : (
									users.map((user, index) => (
										<tr>
											<th scope="row">{index + 1}</th>
											<td>{user.name}</td>
											<td>{user.username}</td>
											<td>{user.email}</td>
											<td>
												<Link
													to={`users/${user.id}`}
													className="btn btn-primary me-2">
													View
												</Link>
												<Link
													to={`users/edit/${user.id}`}
													className="btn btn-outline-primary me-2">
													Edit
												</Link>
												<button
													className="btn btn-danger"
													onClick={() => deleteUser(user.id)}>
													Delete
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
				<AddUser />
			</section>
		</>
	);
};

export default Home;
