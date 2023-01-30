import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

   const navigate=useNavigate();

    const logoutFunciton=async ()=>{

  const res=await fetch('/logout',{

    method: "GET",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",

  })


 const data=res.json();
 if(res.status===500 || res.status===401 || !data){
    window.alert("please login before logout");
    navigate('/signin');
 }else{
navigate('/')
window.alert("logout succesfully");
window.location.reload();

 }


    }

useEffect(() => {
 logoutFunciton();
}, [])



  return (
    <div>Logout</div>
  )
}
