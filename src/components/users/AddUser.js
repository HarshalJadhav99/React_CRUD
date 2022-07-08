import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Home from "../pages/Home";

const AddUser = () => {
    const navigate = useNavigate()
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
	});
    const [status,setStatus]=useState();
	const { name, username, email } = user;
	const onInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post("http://localhost:3003/users", user);
        // navigate('/')
        setStatus(true)
	};
   
	return (
		<>
			<section>
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

export default AddUser;
