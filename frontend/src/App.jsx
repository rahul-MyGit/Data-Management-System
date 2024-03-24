import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar";
import AddCitizen from "./components/AddCitizen";
import CitizenList from "./components/CitizenList";
import EditCitizen from "./components/EditCitizen";
import DeleteCitizen from "./components/DeleteCitizen";
import  Checking  from "./components/Checking";

function App() {
  return (
    <>
    <BrowserRouter>
    <div>
      <Routes>
      <Route path='/' element={<NavBar />}/>
      <Route path="/list" element={<CitizenList />} />
      <Route path='/add'element={< AddCitizen />}/>
      <Route path='/option/:id' element={<Checking />}/>
      <Route path='/edit/:id' element={< EditCitizen />}/>
      <Route path='/delete/:id' element={< DeleteCitizen />}/>
      </Routes>
    </div>
    
    </BrowserRouter>
     
    </>
  )
}

export default App
