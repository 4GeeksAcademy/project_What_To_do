import React from "react";

export const Carousel = () => {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
            <div className="carousel-item active d-flex justify-content-around">
                <img 
                    src="https://th.bing.com/th/id/OIP.Rhjwn6fleSgLBUevM0Nk5QHaE8?rs=1&pid=ImgDetMain" 
                    className="d-block w-50" 
                    alt="https://th.bing.com/th/id/OIP.Rhjwn6fleSgLBUevM0Nk5QHaE8?rs=1&pid=ImgDetMain"
                />
            </div>
            <div className="carousel-item d-flex justify-content-around">
                <img 
                    src="https://th.bing.com/th/id/OIP.PHL4KpmSPBQsNPeGX36bKgHaE7?rs=1&pid=ImgDetMain" 
                    className="d-block w-50" 
                    alt="https://th.bing.com/th/id/OIP.PHL4KpmSPBQsNPeGX36bKgHaE7?rs=1&pid=ImgDetMain"
                />            
            </div>
            <div className="carousel-item d-flex justify-content-around">
                <img 
                    src="https://th.bing.com/th/id/OIP.RYt8wP7hFJAG9qvkEHKD2gHaEK?rs=1&pid=ImgDetMain" 
                    className="d-block w-50" 
                    alt="https://th.bing.com/th/id/OIP.RYt8wP7hFJAG9qvkEHKD2gHaEK?rs=1&pid=ImgDetMain"
                />
            </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};