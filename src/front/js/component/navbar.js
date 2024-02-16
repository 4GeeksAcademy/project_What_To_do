import React from "react";
import { Link } from "react-router-dom";
import touristnautaLogoUrl from "/workspaces/project_What_To_do/public/Touristnauta-logo.png";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext} from "react";
// import  "../component/styles.css";

// const navStyle = {
// 	'background-color':'#537780'
// }

// "Link" paths just written are just for reference, should be changed later
export const Navbar = () => {
    const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	return (

		<nav className="navbar navbar-light bg-light border-bottom">
            <div className="d-flex">
                <Link to="/" className="navbar-brand">
                    <img 
                        src={touristnautaLogoUrl} 
                        alt="app logo" 
                        width="50" 
                        height="50" 
                        className="d-inline-block align-text" 
                    ></img>
                    TOURISTNAUTA
                        {/* <h3>What to Do</h3> */}
                </Link>  
            </div>
            
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
                <div className="d-flex">
                    {/* <div className="ml-auto">
                    <Link to="/search">
                        <span>Search</span>
                    </Link>
                    </div> */}
                    <div className="dropdown">
                        <button 
                            className="btn btn-primary dropdown-toggle" 
                            type="button" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            TOURISTNAUTA!!
                        </button>
                        <ul className="dropdown-menu">
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
		</nav>
	);
};