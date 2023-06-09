/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext);
    
    if(loading){
        return <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#ff0000', '#00ff00', '#0000ff']}
        backgroundColor="#F4442E"
      />
    }

    if(user){
        return children; 
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;