import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom'
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
