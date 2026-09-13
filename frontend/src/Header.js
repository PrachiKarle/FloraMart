import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Header({user}){
    return(
        <>
        <Navbar user={user}/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default Header;