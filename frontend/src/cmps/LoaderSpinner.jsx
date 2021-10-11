import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export  function LoaderSpinner() {
    return (
        <Loader
        type="Grid"
        color="#0079bf"
        height={100}
        width={100}
        timeout={3000} 
        className="loader fade-in"
      />
    )
}
