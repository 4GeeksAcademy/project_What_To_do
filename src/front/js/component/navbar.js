import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext} from "react";
//import  "../component/styles.css";

// "Link" paths just written are just for reference, should be changed later
export const Navbar = () => {
    const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light border-bottom">
			<div className="container-fluid">
                        <Link to="/">
                           <h3>What to Do</h3>
                        </Link>
                        {!sessionStorage.getItem("token")? 
                    <div className="ml-auto">
                        <Link to="/login">
                            <button className="btn btn-primary me-1">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-primary">Signup</button>
                        </Link>
                    </div>
                    :
                        <>
                        {/* <div className="ml-auto">
                        <Link to="/search">
                            <span>Search</span>
                        </Link>
                        </div> */}
                    <div className="ml-auto">
                        <Link to="/">
                            <button className="btn btn-outline-danger" onClick={() => actions.logout(navigate)}>Logout</button>
                        </Link>
                    </div>
                    </>
                }				
			</div>
		</nav>
	);
};