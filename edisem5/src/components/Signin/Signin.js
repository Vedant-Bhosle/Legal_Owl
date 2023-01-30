import React, { useState } from 'react'
import './signIn.css'
import Signinimg from './loginimage.svg'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

export default function Signin() {

  const navigate=useNavigate();

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 

 const loginUser=async(e)=>{
e.preventDefault();

const res=await fetch('/login',{

  method:"POST",
  headers: {"Content-Type":"application/json"},
  body: JSON.stringify({

    email,password
  })
})

const data=await res.json();

if(res.status===400){
window.alert("Invalid Credentials");
navigate('/signin');

}else{
  console.log("logged in succesfully");
  window.alert("login Succesfully");
  navigate('/');

}

 }


  return (
    <>
 
         <Navbar/>
     <div className="Loginmaindiv"> 
        
        <div className="Loginmaindiv2">
        

        
        <div className="LoginSubdiv2">
          
            {/* <LoginImage/> */}
            <img src={Signinimg} className="loignsvgimage" alt=" not found" />
            
        
        </div>
        <div className="LoginSubdiv1">   
           
        {/* <LoginForm/>  */}
        <div>
            <h1 className="LoginFormheading">Sign In</h1>
         <form method="POST">
           <div className="Loginforminput">
             
             <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value) }} name="email" className="Logininpsameclass" placeholder="Your Email"/>
     
             <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value) }} name="password" className="Logininpsameclass" placeholder="Password"/>
     
           
             <input type="submit" onClick={loginUser} className="Loginsubmit" />
           </div>
           </form>
         </div>
             </div>
        
        </div>
        
        </div>
    




    </>

  )
}
