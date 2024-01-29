import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


//NEED EDIT PROFILE ROUTE TO ADD VISITIED/WISHLIST PLACES AND TO EDIT PROFILE
const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [typeOfList, setTypeOfList ] = useState("")

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
               <a>"profile loading..."</a> 
            
        </div>
    );
}

export default Profile;