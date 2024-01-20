import React from "react";
import { Link } from "react-router-dom";

// const myStyle = {
// 	'background-color':'#e3f2fd'
// }

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">What to do</span>
				</Link>
				<div className="ml-auto">
					{/* crea un enlace al Sing up y al Log in */}
					<Link to="/log-in">
						<button className="btn btn-light me-1">Log in</button>
					</Link>
					<Link to="/demo">
						<button className="btn btn-primary">Sing up</button>
					</Link>

				</div>
			</div>
		</nav>
	);
};
