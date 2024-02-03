import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useState } from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Carousel } from "../component/carrusel";
import { Location } from "../component/geolocation"; 
import { SearchPOI } from "../component/SearchPoi"

// import SearchBar from "../component/SearchBar"

//Back ground style for activities
const myStyle = {
	'background-color':'#e3f2fd'
}

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [responseData, setResponseData] = useState([]);

	return (
		<div>
			<div className="container p-3 mb-2 my-4 border border-2 rounded">
				<div className="jumbotron m-5">
					<h1 className="display-4">WELCOME TO WHAT TO DO</h1>
					<p className="lead text-break">
						The app that is going to help you to find a lot of amazing activities near you!!
						Here should be long paragraph to describe why you should use this and how amazing we are 
					</p>
					<p> 
						Your current location is : 	
							<Location/>	
							<SearchPOI responseData = {responseData} setResponseData={setResponseData}/>
							{/* <SearchBar/> */}
					</p>
					<button type="button" 
					class="btn btn-outline-success btn-sm"
					>
						Change location
					</button>
				</div>

				<Carousel/>

			</div>
			<div className="container p-3 mb-2 my-4" style={myStyle}>
				<h2 className="text-center fw-bold fst-italic"> TOP 5 ACTIVITIES </h2>
				<form className="d-flex mb-2" role="search">
					<input 
						class="form-control me-2" 
						type="search"
						placeholder="Search an activity" 
						aria-label="Search"
					/>
					<button class="btn btn-outline-success" type="submit">Search</button>
				</form>
			<ol className="list-group list-group-numbered">
				{responseData.map(result =>

				<li className="list-group-item d-flex justify-content-between align-items-start">
					<div className="ms-2 me-auto">
					<div className="fw-bold">{result.name}</div>
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

