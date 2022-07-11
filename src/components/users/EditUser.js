import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useParams,useNavigate,Link} from 'react-router-dom'
const EditUser = () => {
    const {id} =useParams()
    const navigate = useNavigate();
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
	});
	const { name, username, email } = user;
	const onInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
    useEffect(()=>{
        loadUser()
    },[])
	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.put(`http://localhost:3003/users/${id}`, user);
        navigate('/')
	};

    const loadUser = async ()=>{
        const result = await axios.get(`http://localhost:3003/users/${id}`)
        setUser(result.data)
    }
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
			<section>
				<div className="container my-5">
					<div className="row shadow p-4">
                    <h2>Edit A User</h2>
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
							<button className="btn btn-outline-warning">Update User</button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default EditUser;
