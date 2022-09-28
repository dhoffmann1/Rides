import React from "react";
import { NavLink } from "react-router-dom";
// import Search from "../Search/Search.js";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <div id="landingpage-overall-container">
        <div id="landingpage-grid">
          <div id="the-easiest-way-to-sell-your-car-container">
            <div id="the-easiest-smaller-container">The easiest way to sell your car</div>
          </div>
          <div id="landingpage-filter-search-container">
            <div id="landingpage-filter-search-wrapper">
              <div id="landingpage-filter-search-make-bar">
                <div id="landingpage-make-word">Make</div>
              </div>
              {/* <Search /> */}
            </div>
          </div>
          <div id="welcome-back-container">Welcome Back!</div>
          <div id="landingpage-footer-container">Footer</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
