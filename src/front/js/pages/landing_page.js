import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Carousel } from "../component/carrusel";
import { Location } from "../component/geolocation"; 
import { SearchPOI } from "../component/SearchPoi";
import { Link } from "react-router-dom";

//Back ground style for activities
const myStyle = {
	'background-color':'#bff8d4'
}

//Back ground for container 1
const containerStyle = {
	"background": "linear-gradient(to top, #fff1eb 0%, #a0b7c5 100%)"
}

export const LandingPage = () => {
	const { store, actions } = useContext(Context);
	const [responseData, setResponseData] = useState([]);
	const [searchInput, setSearchInput] = useState('');
	const [clickSearch, setClickSearch] = useState(false)

	return (
		<div>
			<div className="container p-3 mb-2 my-4 border border-2 rounded" style={containerStyle}>
				<div className="jumbotron m-5">
					<h1 className="display-4">WELCOME TO TOURISTNAUTA</h1>
					<p className="lead text-break">
						<strong>
							The app that is going to help you to discover what's fun!
						</strong>!<br></br>
						Do not just be another turist in town. Go to places where the locals connect 
						and have fun. Be part of the essence everywhere you go 
					</p>
					<p> 
						Your current location is :
					</p>
					<h3>
						<Location/>
						<SearchPOI 
							clickSearch = {clickSearch} 
							setClickSearch = {setClickSearch} 
							searchInput={searchInput} 
							responseData = {responseData} 
							setResponseData = {setResponseData}
						/>	
					</h3>	
					<button type="button" 
					class="btn btn-outline-success btn-sm"
					>
						Change location
					</button>
				</div>

				<Carousel/>

			</div>
			<div className="container p-3 mb-2 my-4" style={myStyle}>
				<h2 className="text-center fw-bold fst-italic"> TOP ACTIVITIES </h2>
				<form 
					className="d-flex mb-2" 
					role="search"
					onSubmit = {(e) => e.preventDefault()}
				>
					<input 
						class="form-control me-2" 
						type="search" 
						placeholder="Search an activity" 
						aria-label="Search"
						onChange={(e) => setSearchInput(e.target.value)}
					/>
					<button 
						class="btn btn-outline-success" 
						type="submit"
						onClick={() => setClickSearch(true)}
					>
						Search
					</button>
				</form>
				<ol className="list-group list-group-numbered">

				{responseData.map(result =>
					<li className="list-group-item d-flex justify-content-between align-items-start">
						<div className="ms-2 me-auto">
						<div className="fw-bold">
						<Link to={`/activity/${result.id}`}>	
							{result.name}
						</Link >
						</div>
							{result.address}
						</div>
						<span className="badge bg-primary rounded-pill">{result.category}</span>
					</li>	
					)}
				</ol>
			</div>
		</div>
	);
};

