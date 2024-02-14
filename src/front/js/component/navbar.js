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
                <div className="d-flex">
                    <Link to="/" className="navbar-brand">
                        <img src="/workspaces/project_What_To_do/public/rigo-baby.jpg" alt="app logo" ></img>
                        <h3>TOURISTNAUTA</h3>
                           {/* <h3>What to Do</h3> */}
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
                        <div>
                            {/* <div className="ml-auto">
                            <Link to="/search">
                                <span>Search</span>
                            </Link>
                            </div> */}
                            <div class="dropdown">
                                <button 
                                    class="btn btn-primary dropdown-toggle" 
                                    type="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    What to Do!!
                                </button>
                                <ul class="dropdown-menu">
                                    <ol> 
                                        <div className="ml-auto">
                                            <Link to="/profile">
                                                <span>My Profile</span>
                                            </Link>
                                        </div>
                                    </ol>
                                    <ol>
                                        <div className="ml-auto">
                                            <Link to="/myposts">
                                                <span>My Posts</span>
                                            </Link>
                                        </div>
                                    </ol>
                                    <ol>
                                        <div className="ml-auto">
                                            <Link to="/newpost">
                                                <span>New Post</span>
                                            </Link>
                                        </div>
                                    </ol>
                                </ul>
                            </div>
                            <div className="ml-auto">
                                <Link to="/">
                                    <button 
                                        className="btn btn-outline-danger" 
                                        onClick={() => actions.logout(navigate)}
                                    >
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    }				
			    </div>
            </div>
		</nav>
	);
};