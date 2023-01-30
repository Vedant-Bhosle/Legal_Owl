import React from 'react'
import {
  BrowserRouter as Router,
 
  Link
} from "react-router-dom";
import './navbar.css'

export default function Navbar() {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div class="container-fluid">
    
    <Link class="navbar-brand cnavheading">Legal Owl</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         <li class="nav-item "> {/*cnavlink is customnavlink */}
          {/* <a class="nav-link cnavlink active" aria-current="page" href="#">Home</a> */}
          <Link to="/" className="nav-link cnavlink active" active>Home</Link>
        </li>
        <li class="nav-item "> {/*cnavlink is customnavlink */}
          {/* <a class="nav-link cnavlink active" aria-current="page" href="#">SignIn</a> */}
          <Link to="/signin" className="nav-link cnavlink active" >Signin</Link>
        </li>
        <li class="nav-item "> {/*cnavlink is customnavlink */}
          {/* <a class="nav-link cnavlink active" aria-current="page" href="#">SignUp</a> */}
          <Link to="/signup" class="nav-link cnavlink active">SignUp</Link>
        </li>
        <li class="nav-item "> {/*cnavlink is customnavlink */}
          {/* <a class="nav-link cnavlink active" aria-current="page" href="#">SignUp</a> */}
          <Link to="/question" class="nav-link cnavlink active">Questionaire</Link>
        </li>
        <li class="nav-item "> {/*cnavlink is customnavlink */}
          {/* <a class="nav-link cnavlink active" aria-current="page" href="#">SignUp</a> */}
          <Link to="/document" class="nav-link cnavlink active">Document</Link>
        </li>
        <li class="nav-item "> {/*cnavlink is customnavlink */}
          {/* <a class="nav-link cnavlink active" aria-current="page" href="#">SignUp</a> */}
          <Link to="/logout" class="nav-link cnavlink active">Logout</Link>
        </li>
      </ul>
    
    </div>
  </div>
</nav>
    </>
  )
}
