import NavbarComp from "../components/NavbarComp";
import FooterComp from "../components/FooterComp"
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import React from 'react'

function MainLayout() {
  return (
    <div>
       <ScrollToTop />
       
      <NavbarComp />

      <Outlet />

      <FooterComp />

    </div>
  )
}

export default MainLayout
