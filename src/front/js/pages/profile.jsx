import React from "react";

const Profile = () => {

    return (
        <div>
            <div className="container fluid">
                <div className="row">
                    <div class="card col-3">
                        <img src="https://www.pngkey.com/png/full/73-730477_first-name-profile-image-placeholder-png.png" class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Nombre de Usuario</h5>
                            <p class="card-text">Bio description</p>
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
                                        <p><span>First Name </span>: Camila</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Last Name </span>: Smith</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Country </span>: Australia</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Birthday</span>: 13 July 1983</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Occupation </span>: UI Designer</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Email </span>: jsmith@flatlab.com</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Mobile </span>: (12) 03 4567890</p>
                                    </div>
                                    <div class="bio-row">
                                        <p><span>Phone </span>: 88 (02) 123456</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile