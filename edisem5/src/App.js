// import Navbar from "./components/Navbar/Navbar";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import React from "react";

import {  Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Question from "./components/Questionaire/Question";
import NOC from "./components/NOC form/NOC"
import Logout from "./components/Logout/Logout";
function App() {
  return (
    <>
   

      {/* <Navbar/> */}
    {/* <Signin/> */}
    {/* <Signup/> */}
   
      <Routes>
    
          <Route path="/" element={<HomePage/>} />
          <Route path="/signin"  element={<Signin />} />
          <Route path="/signup"  element={<Signup />} />
          <Route path="/question" element={<Question/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/document" element={<NOC/>} />
          {/* <Route path="*" element={<NoPage />} /> */}
       
      </Routes>
    
    </>
  );
}

export default App;
