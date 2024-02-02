import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import  "../component/styles.css";


const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate()
        }, 500)
    }, [])

    return (
        <div className="container text-center profile-container">
            <h2>
                Your Location Name: Miami
            </h2>
        
            {
            <div>
                <div  style="width: 18">
                                
                                
                            </div>
                {/* <div className="carousel slide">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="card" style="width: 18rem;">
                                <img src="..." className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                        <div className="carousel-item active">
                            <div className="card" style="width: 18rem;">
                                <img src="..." className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="carousel-item">
                        <div className="carousel-item active">
                            <div className="card" style="width: 18rem;">
                                <img src="..." className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div> */}
            </div> 
            }
            
        </div>
    );
}

export default Profile;