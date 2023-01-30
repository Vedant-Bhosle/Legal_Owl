import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./NOC.css";
// import signupimg from './signupsvg.svg'

export default function Question() {


  const navigate= useNavigate()
  const[finalarray,setfinalarray]=useState([]);

  const callQuestionpage = async () => {
    try {
      const res = await fetch("/Question", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

     const data=res.json();
     if(res.status=== 401 ){
      res.send("not logged in")
      navigate('/signin');
     }
    

    } catch (error) {

      // console.log(error);
      navigate('/signin');
    }
  };

  useEffect(() => {
    callQuestionpage();
  }, []);

// ----------------------------------------------------------------

  const [query, setquery] = useState({
    newOwner:"",
    propertyName:"",
    address:"",
    phnumber:"",
    area:"",
    organization:"",
    reqName:"",
    approvalName:"",
    name:""


  });
  const handleInputs =(e)=>{
    // console.log(e);
    let name=e.target.name;
    let value=e.target.value;
    setquery({...query,[name]:value});

  }
const postData=async (e)=>{
e.preventDefault();

const{
   newOwner,
propertyName,
address,
phnumber,
area,
organization,
reqName,
approvalName,
name

}=query;

window.alert("in postData function")
let linkdata;
try {
  const linkresult=await fetch('http://127.0.0.1:5000/noc',{
  method:"POST",
  headers: {"Content-Type":"application/json"},
  body: JSON.stringify(
    {
      newOwner,
      propertyName,
      address,
      phnumber,
      area,
      organization,
      reqName,
      approvalName,
      name
    }
  )
})

console.log("linkresult below");
 linkdata=await linkresult.json();
// console.log(linkdata);
// console.log(linkdata[0])

// console.log(linkresult);
// const linkdata= await linkresult.json();
if(linkresult.status===500 || !linkdata){
  window.alert(" data can not get from flask noc");
  console.log("data can not get from  flask noc");
  // navigate('/signup');

}else{
  window.alert("noc done succesfully");
  // navigate('/signin');
}


} catch (error) {
  console.log(error);
  window.alert("error from noc ")
}


// request for saving questionaire data in mongo//////////////////////////////////



}




  return (
    <>
      <Navbar />
      <div className="documentdiv">
        <div className="docsubdiv1">
          {/* form */}
          <div>
            <h1 className="SignupFormheading">NOC Certificate By LandLord :</h1>
            <form method="POST">
              <div className="forminput">
            <input
                  type="text"
                  name="newOwner" value={query.newOwner} onChange={handleInputs}
                  className="registerinpsameclass"
                  placeholder="Enter the name of LandLord"
                />  <br/> 
                <input
                type="text"
                name="propertyName" value={query.propertyName} onChange={handleInputs}
                className="registerinpsameclass"
                placeholder="Enter the name property"
              />   <br/>
              <input
              type="text"
              name="address" value={query.address} onChange={handleInputs}
              className="registerinpsameclass"
              placeholder="Enter your property address"
            />   <br/>
            <input
            type="text"
            name="phnumber" value={query.phnumber} onChange={handleInputs}
            className="registerinpsameclass"
            placeholder="Enter your phone number"
          />   <br/>
          <input
          type="text"
          name="area" value={query.area} onChange={handleInputs}
          className="registerinpsameclass"
          placeholder="Enter the area in sq."
        />  <br/> 
        <input
        type="text"
        name="organization" value={query.organization} onChange={handleInputs}
        className="registerinpsameclass"
        placeholder="Enter your organization name"
      />  <br/>
       <input
      type="text"
      name="reqName" value={query.reqName} onChange={handleInputs}
      className="registerinpsameclass"
      placeholder="Enter the name of requester"
    />  <br/>
     <input
    type="text"
    name="approvalName" value={query.approvalName} onChange={handleInputs}
    className="registerinpsameclass"
    placeholder="Enter the organization name"
  /> <br/>
    <input
  type="text"
  name="name" value={query.name} onChange={handleInputs}
  className="registerinpsameclass"
  placeholder="Enter your document name"
/>
<br/>
                <input type="submit" onClick={postData} className="signupsubmit" />
                </div>
            </form>
          </div>
          {/* <RegisterationForm/> */}
        </div>




      
      </div>




    

 
 

    </>
  );
}
