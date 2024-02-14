import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [biography, setBiography] = useState(user.biography)
    const [permLocation, setPermLocation] = useState(user.perm_location)
    const {store , actions} = useContext(Context)
    const handleSubmit = () =>{
        actions.editUser(firstName,lastName,biography,permLocation)
    }

    return (
        <div>
            <div 
                className="modal" 
                // tabIndex="-1" 
                id="editProfileModal"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Your Profile</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-2">
                            <div className="col-md">
                                <div className="input-group mb-3">
                                    <span 
                                        className="input-group-text" 
                                        id="basic-addon1"
                                    >
                                        First Name
                                    </span>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="FirstName" 
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="input-group mb-3">
                                    <span 
                                        className="input-group-text" 
                                        id="basic-addon1"
                                    >
                                        Last Name
                                    </span>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        aria-label="LastName" 
                                        aria-describedby="basic-addon1"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="form-floating">
                            <textarea 
                                class="form-control" 
                                placeholder="Edit your bio here" 
                                id="BioTextarea"
                                onChange={(e) => setBiography(e.target.value)}
                            ></textarea>
                            <label for="BioTextarea">Bio</label>
                        </div>
                        <div class="my-3">
                            <label for="basic-url" class="form-label">Your Current Location</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"
                                    onChange={(e) => setPermLocation(e.target.value)}
                                />
                            </div>
                            {/* <div class="form-text" id="basic-addon4">
                                Example help text goes outside the input group.
                            </div> */}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            data-bs-dismiss="modal"
                        >
                            Save changes
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile