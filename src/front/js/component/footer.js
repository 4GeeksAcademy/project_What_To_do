import React, { Component } from "react";

const footStyle = {
	'background-color':'rgb(19 248 104 / 80%)'
}
// #bbe4e9 #79c2d0 #bff8d4 #55e9bc #fffcca 
// rgb(19 248 104 / 80%) | rgb(150 168 179 / 70%)
export const Footer = () => (
	<footer className="footer mt-3 py-3 text-center" style={footStyle}>
		<p className="fs-5">
			<b> © TOURISTNAUTA, 2024 </b>
		</p>
	</footer>
);
