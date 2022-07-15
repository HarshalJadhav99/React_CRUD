import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AddUser from "../users/AddUser";
import { GrView } from "react-icons/gr";
import { BsArrowDownUp } from "react-icons/bs";
import { RiArrowUpDownLine } from "react-icons/ri";
import { TbArrowsUpDown } from "react-icons/tb";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
	const [users, setUser] = useState([]);
	const [value, setValue] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [pageLimit] = useState(4);
	const [sortValue, setSortValue] = useState("");
	const [operation, setOperation] = useState("");

	// AddUsers
	const [user, setUsers] = useState({
		name: "",
		username: "",
		email: "",
	});
	const [status, setStatus] = useState();
	const { name, username, email } = user;
	const onInputChange = (e) => {
		setUsers({ ...user, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post("http://localhost:3003/users", user);

		setStatus(true);
	};
	const [order, setOrder] = useState("ASC");

	useEffect(() => {
		loadUsers(0, 4, 0);
	}, []);
	const loadUsers = async (start, end, increas, optType = null, sortValue) => {
		switch (optType) {
			case "search":
				setOperation(optType);
				setUser("");
				return await axios
					.get(
						`http://localhost:3003/users?q=${value}&_start=${start}&_end=${end}`
					)
					.then((response) => {
						setUser(response.data);
						setCurrentPage(currentPage + increas);
					})
					.catch((err) => console.log(err));
			default:
				const result = await axios.get(
					`http://localhost:3003/users?_start=${start}&_end=${end}`
				);
				setUser(result.data);
				setCurrentPage(currentPage + increas);
		}
	};

	const deleteUser = async (id) => {
		await axios.delete(`http://localhost:3003/users/${id}`);
		loadUsers();
	};
	// Search Users
	const handleReset = () => {
		setOperation("");
		setValue("");
		loadUsers(0, 4, 0);
	};
	const handleSearch = async (e) => {
		e.preventDefault();
		loadUsers(0, 4, 0, "search");
		// return await axios
		// 	.get(`http://localhost:3003/users?q=${value}`)
		// 	.then((response) => {
		// 		setUser(response.data);
		// 		setValue("");
		// 	})
		// 	.catch((err) => console.log(err));
	};
	// Sorting

	const sorting = (col) => {
		if (order === "ASC") {
			const sorted = [...users].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setUser(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...users].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setUser(sorted);
			setOrder("ASC");
		}
	};
	if (status) {
		return <Home />;
	}
	const renderPagination = () => {
		if (users.length < 4 && currentPage === 0) return null;
		if (currentPage === 0) {
			return (
				<nav className="d-flex justify-content-center">
					<ul className="pagination">
						<li className="page-link">1</li>
						<li
							className="page-link btn"
							onClick={() => loadUsers(4, 8, 1, operation)}>
							Next
						</li>
					</ul>
				</nav>
			);
		} else if (currentPage < pageLimit - 1 && users.length === pageLimit) {
			return (
				<nav className="d-flex justify-content-center">
					<ul className="pagination">
						<li
							className="page-link btn"
							onClick={() =>
								loadUsers((currentPage - 1) * 4, currentPage * 4, -1, operation)
							}>
							Prev
						</li>
						<li className="page-link">{currentPage + 1}</li>
						<li
							className="page-link btn"
							onClick={() =>
								loadUsers(
									(currentPage + 1) * 4,
									(currentPage + 2) * 4,
									1,
									operation
								)
							}>
							Next
						</li>
					</ul>
				</nav>
			);
		} else {
			return (
				<nav className="d-flex justify-content-center">
					<ul className="pagination">
						<li
							className="page-link btn"
							onClick={() =>
								loadUsers((currentPage - 1) * 4, currentPage * 4, -1, operation)
							}>
							Prev
						</li>
						<li className="page-link">{currentPage + 1}</li>
					</ul>
				</nav>
			);
		}
	};
	return (
		<>
			<section className="mb-4">
				<nav className="navbar navbar-expand-lg bg-light">
					<div className="container-fluid">
						<Link className="navbar-brand" to="/">
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
								onSubmit={handleSearch}>
								<input
									type="text"
									className="form-control"
									placeholder="Search"
									value={value}
									onChange={(e) => setValue(e.target.value)}
								/>
								<button type="submit" className="btn btn-outline-primary mx-2">
									Search
								</button>
								<button
									className="btn btn-outline-primary"
									onClick={() => handleReset()}>
									Reset
								</button>
							</form>
						</div>
					</div>
				</nav>
			</section>
			<section className="mb-5">
				<div className="container">
					<div className="row">
						<h1>React CRUD</h1>

						{/* <div className="col-6">
							<h5>Sort By:</h5>
							<select
								style={{ width: "50%", borderRadius: "2px", height: "35px" }}
								onChange={handleSort}
								value={sortValue}>
								<option>Please Select Value</option>
								{sortOptions.map((item, index) => (
									<option value={item} key={index}>
										{item}
									</option>
								))}
							</select>
						</div> */}
						
							<table class="table table-hover border shadow">
								<thead className="table-dark table-header-custom">
									<tr>
										<th scope="col">No</th>
										<th
											scope="col"
											className="arrow"
											onClick={() => sorting("name")}>
											Name <BsArrowDownUp />
										</th>
										<th scope="col" onClick={() => sorting("username")}>
											UserName <BsArrowDownUp />
										</th>
										<th scope="col" onClick={() => sorting("email")}>
											Email <BsArrowDownUp />
										</th>
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
										users
											.filter((val) => {
												if (value === "") {
													return val;
												} else if (
													val.name
														.toLowerCase()
														.includes(value.toLowerCase()) ||
													val.username
														.toLowerCase()
														.includes(value.toLowerCase()) ||
													val.email.toLowerCase().includes(value.toLowerCase())
												) {
													return val;
												}
											})
											.map((user, index) => (
												<tr>
													<th scope="row">{index + 1}</th>
													<td>{user.name}</td>
													<td>{user.username}</td>
													<td>{user.email}</td>
													<td>
														<Link
															to={`users/${user.id}`}
															className="btn btn-outline-primary me-2">
															<i class="fa-solid fa-eye"></i>
														</Link>
														<Link
															to={`users/edit/${user.id}`}
															className="btn btn-outline-primary me-2">
															<i class="fa-solid fa-user-pen"></i>
														</Link>
														<button
															className="btn btn-outline-danger"
															onClick={() => deleteUser(user.id)}>
															<i class="fa-solid fa-trash"></i>
														</button>
													</td>
												</tr>
											))
									)}
								</tbody>
							</table>
						
						<div>{renderPagination()}</div>
					</div>
				</div>
			</section>
			<section className="mb-5">
				<div className="container">
					<div className="row shadow p-4">
						<form onSubmit={(e) => onSubmit(e)}>
							<div className="form-group mb-3">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Enter Your Name"
									name="name"
									value={name}
									onChange={(e) => onInputChange(e)}
								/>
							</div>
							<div className="form-group mb-3">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Enter Your UserName"
									name="username"
									value={username}
									onChange={(e) => onInputChange(e)}
								/>
							</div>
							<div className="form-group mb-3">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Enter Your Email"
									name="email"
									value={email}
									onChange={(e) => onInputChange(e)}
								/>
							</div>
							<button className="btn btn-outline-primary">Add User</button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
