import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Question.css";
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
    state:"",city:"",employeestatus:"",description:"",
  });
  const handleInputs =(e)=>{
    // console.log(e);
    let name=e.target.name;
    let value=e.target.value;
    setquery({...query,[name]:value});

  }
const postData=async (e)=>{
e.preventDefault();

const{state,city,employeestatus,description}=query;

window.alert("in postData function")
let linkdata;
try {
  const linkresult=await fetch('http://127.0.0.1:5000/getlinks',{
  method:"POST",
  headers: {"Content-Type":"application/json"},
  body: JSON.stringify(
    {
    description
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
  window.alert(" data can not get from flask");
  console.log("data can not get from flask");
  // navigate('/signup');

}else{
  window.alert("linkdataget succesfully");
  // navigate('/signin');
}


} catch (error) {
  console.log(error);
  window.alert("error from getlinks ")
}

console.log("printing link data")
console.log(linkdata);
//getting summary from  mongo///////////////////////////////////////////////////////
let printarray;
if(linkdata){

  try{
    const response= await fetch("/getsummary",{
   
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(
        {
          linkdata
        }
      ) })
    
    
      const data=await response.json();
      console.log(data.summary)
      
       setfinalarray(data.summary)

    if(response.status===500 || !data){
      window.alert("something wrong while getting summary");
      console.log("something  wrong while getting summary");
      // navigate('/signup');
    
    }else{
      window.alert("summary  found  Succesfully");
      // navigate('/signin');
    }
  }catch(e){
  window.alert("error from getting summary from mongo")
  }

}
else{
window.alert("no similar cases found");
}
// request for saving questionaire data in mongo//////////////////////////////////

try{
  const response= await fetch("/addquery",{
 
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(
      {
        state,city,employeestatus,description
      }
    ) })
  
  
    const data=await response.json();
  if(response.status===500 || !data){
    window.alert("something wrong");
    console.log("something  wrong");
    // navigate('/signup');
  
  }else{
    window.alert("query added Succesfully");
    // navigate('/signin');
  }
}catch(e){
window.alert("error while saving questionarie data in monodb")
}


}




  return (
    <>
      <Navbar />
      <div className="questionmaindiv">
        <div className="questionsubdiv1">
          {/* form */}
          <div>
            <h1 className="SignupFormheading">Questionaire</h1>
            <form method="POST">
              <div className="forminput">
                <input
                  type="text"
                  name="state"
                  list="feild" value={query.state} onChange={handleInputs}
                  className="registerinpsameclass"
                  placeholder="your state"
                />
                <datalist id="feild">
                  <option value="Maharashtra" />
                  <option value="Karnataka" />
                  <option value="Punjab" />
                </datalist>

                <input
                  type="text"
                  name="city" value={query.city} onChange={handleInputs}
                  className="registerinpsameclass"
                  placeholder="Enter your city"
                />

                <input
                  type="text"
                  name="employeestatus" value={query.employeestatus} onChange={handleInputs}
                  className="registerinpsameclass"
                  placeholder="Enter your Employment status"
                />

                {/* <input
                  type="text"
                  name="situation"
                  list="situation"
                  className="registerinpsameclass"
                  placeholder="which option resembles your Situation the most"
                />
                <datalist id="situation">
                  <option value="one" />
                  <option value="two" />
                  <option value="three" />
                </datalist> */}
{/* 
               <input type="text" className="registerinpsameclass textarea" name="issue"   placeholder="Enter your issue"  /> */}

               <textarea name="description" value={query.description} onChange={handleInputs} className="registerinpsameclass textarea" placeholder="Enter your issue" cols="30" rows="10"></textarea>

                <input type="submit" onClick={postData} className="signupsubmit" />
              </div>
            </form>
          </div>
          {/* <RegisterationForm/> */}
        </div>




      
      </div>



      {/* {
     finalarray.map( element =>  {

      if(finalarray.length==0){
      return <h2>Summary Not Found</h2>
      }
     return <div key={element.link} className="result">
     <h2 className="headingresult">Result </h2>
      <p>
        {element.summary}
      </p>
     
       <div className="linktag">
      <a className="caselink" target="_blank" href={element.link}>Read more</a>
      </div>
    </div>
     }
    
    )
  } */}
     
  {
     finalarray.map( element =>  <div key={element.link} className="result">
     <h2 className="headingresult">Result </h2>
      <p>
        {element.summary}
      </p>
     
       <div className="linktag">
      <a className="caselink" target="_blank" href={element.link}>Read more</a>
      </div>
    </div>
    
    )
  }
 
{/* 
<div  className="result">
     <h2 className="headingresult">Result </h2>
      <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quod quo doloribus repellendus, voluptatibus rerum dolorum veniam nobis, architecto, perspiciatis enim laborum facilis temporibus tempore exercitationem! Quaerat, corporis. Laudantium, soluta.
      </p>
      
      <div className="linktag">
      <a className="caselink" href="">;sdaklfj;aieorjfna;sdkj</a>
      </div>
    </div> */}
    </>
  );
}
