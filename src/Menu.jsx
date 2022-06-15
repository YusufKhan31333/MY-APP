import React from "react";
import { Link } from "react-router-dom";
import './index.css';

const Menu = () => {

    return(
        <>
        <Link to="/">Home</Link>
        <Link to="/item">Item</Link>
        <Link to="/">Sync</Link>

        </> 
    );
};

export default Menu;