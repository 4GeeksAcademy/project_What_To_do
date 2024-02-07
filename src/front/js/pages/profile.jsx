import React, { useContext , useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    let user = store.user

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        authenticate()
        
      
        
    }, [])

    return (
        <div>
             {store.user != null ?
            <div className="container fluid">
                <div className="row">
                    <div class="card col-3">
                        <img src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png" class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">{user.first_name} {user.last_name}</h5>
                            <p class="card-text">Favorite activities</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                            <li class="list-group-item">A fourth item</li>
                            <li class="list-group-item">A fifth item</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </div>
                    </div>
                    
                    <div class="profile-info col-md-9">
                        <div class="panel">
                            <form>
                                <textarea placeholder="Whats in your mind today?" rows="2" class="form-control input-lg p-text-area"></textarea>
                            </form>
                            <footer class="panel-footer">
                                <button class="btn btn-warning pull-right">Post</button>
                                <ul class="nav nav-pills">
                                    <li>
                                        <a href="#"><i class="fa fa-map-marker"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="fa fa-camera"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class=" fa fa-film"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i class="fa fa-microphone"></i></a>
                                    </li>
                                </ul>
                            </footer>
                        </div>
                        <div class="panel">
                            <div class="bio-graph-heading">
                                Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum. Aliquam ac magna metus.
                            </div>
                            <div class="panel-body bio-graph-info">
                                <h1>Bio Graph</h1>
                                <div class="row">
                                    <div class="bio-row">
                                        <p><span>First Name </span>: First name</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Last Name </span>: Last name</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Permanent location </span>: Location</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Places visited </span>: Places</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Places I'd like to visit </span>: wish list places</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Activities I'd like to do </span>: Activities</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                   :
                   "profile loading..."
               }
        </div>
    )
}

export default Profile