import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './Signup.css'
import{ useNavigate} from 'react-router-dom';
import signupimg from './signupsvg.svg'


export default function Signup() {

 const history= useNavigate();
  

  const [user, setuser] = useState({
    firstname:"",email:"",feild:"",password:"",confirmpassword:""
  });
  
  const haneleInputs =(e)=>{
    // console.log(e);
    let name=e.target.name;
    let value=e.target.value;
    setuser({...user,[name]:value});

  }
const postData=async (e)=>{
e.preventDefault();

const{firstname,email,feild,password,confirmpassword}=user;

const res= await fetch("/register",{
 
  method:"POST",
  headers: {"Content-Type":"application/json"},
  body: JSON.stringify(
    {
      firstname,email,feild,password,confirmpassword
    }
  ) })


  const data=await res.json();
if(res.status===500 || !data){
  window.alert("Invalid Regisertion");
  console.log("Invalid Registeration");
  history('/signup');

}else{
  window.alert("Registeration Succesfully");
  history('/signin');
}

}

  return (
    <>
    {/* <div className="Signupmaindiv"> */}
   <Navbar/>
    <div className="Signupmaindiv">
        
        <div className="Signupmaindiv2">
        
        <div className="SignupSubdiv1">
            {/* form */} 
            <div>
                <h1 className="SignupFormheading">Sign up</h1>
          <form method="POST" >
                <div className="forminput">
                  <input type="text" name="firstname"
                   value={user.firstname} onChange={haneleInputs}     className="registerinpsameclass" placeholder="Your Name"/>
          
                  <input type="email" name="email"
                   value={user.email} onChange={haneleInputs}     className="registerinpsameclass" placeholder="Your Email"/>
          
          
                  <input type="text" name="feild"
                   value={user.feild} onChange={haneleInputs}     list="feild" className="registerinpsameclass" placeholder="your feild"/>
                  <datalist id="feild">
                    <option value="user" />
                    <option value="lawer"/>
                    <option value="------"  />
                  </datalist>
          
                  <input type="password" name="password"
                   value={user.password} onChange={haneleInputs}     className="registerinpsameclass" placeholder="Password"/>
          
                  <input type="password" name="confirmpassword" 
                   value={user.confirmpassword} onChange={haneleInputs}     className="registerinpsameclass" placeholder="Confirm your password"/>
          
                  <input type="submit" onClick={postData} className="signupsubmit" />
                </div>
                </form>
              </div>
        {/* <RegisterationForm/> */}
        
        </div>
        <div className="SignupSubdiv2">   
            {/*image  */}
            <div>
                <img src={signupimg} className="signupsvgimage" alt=" not found" />
                    </div>
            {/* <Signupimage/> */}
             </div>
        
        </div>
        
        </div>

    {/* </div> */}
    </>
  )
}
