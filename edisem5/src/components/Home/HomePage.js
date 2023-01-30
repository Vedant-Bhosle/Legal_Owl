import React from 'react'
import {
  BrowserRouter as Router,
 
  Link
} from "react-router-dom";
import Navbar from '../Navbar/Navbar'
import './HomePage.css';

export default function HomePage() {
  return (
    <>
    <Navbar/>
    
    <div className="homepagemaindiv">



           {/* /long box */}
           <div className="homepagesubdiv1">
             
             <div className="homelognbox">
            
             </div>

            </div>



          {/* 2 boxes */}
        <div className="homepagesubdiv2">
           
            <div className="homeSubdiv2box ">
                <div className="homeboxcard homebox2">
               
                <Link to="/question" > <button className="homeboxbtn">Aid</button></Link>
               
                </div>
             
            </div>

             <div className="homeSubdiv2box ">
             <div className="homeboxcard homebox3">
         
                <button className="homeboxbtn homeboxbtn2">Fill</button>
                </div>
             </div>



        </div>
     

    </div>
    
    
    
    </>
  )
}
