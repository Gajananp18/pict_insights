import React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import SignUpAdmin from "./pages/admin/SignUpAdmin"
import LoginAdmin from "./pages/admin/LoginAdmin"

import { createContext, useEffect, useState } from "react";
import { Home } from "../src/components/scripts/Home";
import { Notice } from "./components/scripts/Notice";
import { Internship } from "./components/scripts/Internship";
import { Placement } from "./components/scripts/Placement";

import NoticeForm from "./components/scripts/Admin/NoticeForm";
import InternshipForm from "./components/scripts/Admin/InternshipForm";
import PlacementForm from "./components/scripts/Admin/PlacementForm";
import { HomeAdmin } from "./components/scripts/Admin/HomeAdmin";

export const userContext=createContext({})

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />

        <Route path="/notice" element={<Notice />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/placement" element={<Placement />} />
        
        <Route path="/noticeForm" element={<NoticeForm />} />
        <Route path="/internshipForm" element={<InternshipForm />} />
        <Route path="/placementForm" element={<PlacementForm />} />
        <Route path="/adminLogin" element={<LoginAdmin />} />
        <Route path="/adminSignup" element={<SignUpAdmin />} />
        <Route path="/adminHome" element={<HomeAdmin />} />
      </Routes>

    </BrowserRouter>

  )
}

export default App