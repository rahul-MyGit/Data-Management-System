import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function CitizenList(){
  const [citizens, setCitizens] = useState([]);
  useEffect(() => {
    getCitizens();
  }, []);

  const getCitizens = async () => {
    try {
      const response = await axios.get('http://localhost:8000/citizens');
      setCitizens(response.data);
    } catch (error) {
      console.error('Error fetching citizens:', error);
    }
  };
  const navigae = useNavigate();

  const handleClick = () => {
    navigae('/')
  }

  return (
    <div>
      <h1>List of Citizens</h1>

      <ul>
        {citizens.map(citizen => (
          <li key={citizen.id}>
            <Link to={`/option/${citizen.id}`}>
              {citizen.firstName} {citizen.lastName}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Go back to Home</button>
    </div>
  );
};

export default CitizenList


// CAN USE BELOW CODE FOR SEARCHING, ADDED DEBOUNCING FUNCTIONALITY. BUT DON'T KNOW HOW TO MAKE A BACKEND FOR THIS ROUTE AS I HAVE NEVER WORKED WITH GO LANG:-)


// import { useEffect, useState } from "react"
// import { Button } from "../components/Button";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { capitalize, } from "lodash";


// export const Users = ()=>{
//     const [state, setState] = useState([]);
//     const [filter, setFilter] = useState("");
//     // debouncing:

//     useEffect(() => {
//         // Fetch all values initially
//         axios.get("http://localhost:8000/bulk")
//         .then(res => {
//                 setState(res.data.user);
//             })
//             .catch(err => {
//                 console.log("Error in fetching users data:", err);
//             });
//     }, []);

//     useEffect(() => {
//         const delayDebounce = setTimeout(() => {
//             if (filter !== "") {
//                 axios.get(`http://localhost:8000r/bulk?filter=${filter}`)
//                     .then(res => {
//                         setState(res.data.user);
//                     })
//                     .catch(err => {
//                         console.log("Error in fetching users data:", err);
//                     });
//             } else {
//                 // If filter is empty, fetch all values again
//                 axios.get("http://localhost:8000/bulk")
//                     .then(res => {
//                         setState(res.data.user);
//                     })
//                     .catch(err => {
//                         console.log("Error in fetching users data:", err);
//                     });
//             }
//         }, 500); // Adjust the debounce timeout as needed (e.g., 500 milliseconds)

//         return () => clearTimeout(delayDebounce);
//     }, [filter]);

//     return <>
//         <div className="font-bold mt-6 text-lg">
//             Contacts
//         </div>
//         <div className="my-2">
//             <input onChange={e=>{setFilter(e.target.value)}} type="text" placeholder="Search users ..." />
//         </div>
//         <div>
//             {state.map(user => <User user={user} />)}
//         </div>
//     </>
// }
// function User({user}){
//     const navigate = useNavigate();
//     return <div className="flex justify-between">
//         <div className="flex">
//             <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
//                 <div className="flex flex-col justify-center h-full text-xl">
//                     {user.firstName[0]}
//                 </div>
//             </div>
//             <div className="flex flex-col justify-center h-full">
//                 <div>
//                     {capitalize(user.firstName)} {capitalize(user.lastName)}
//                 </div>
//             </div>
//         </div>

//         <div className="flex flex-col justify-center h-full">
//             <Button onClick={()=>{
//                 // history.pushState("/send?id=" + user._id + "&name=" + user.firstName);
//                 navigate("/option?id=" + user._id); 
//             }} label ={"Edit/Delete"} />
//         </div>
//     </div> 
// }