import React from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";

function Checking() {
    const {id} = useParams()
    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate('/list')
    }

  return (
    <div>
        <Link to={`/edit/${id}`}>Edit Details</Link>
        <br />
        <Link to={`/delete/${id}`}>Delete Details</Link>
        <br />
        <button onClick={handleClick}>Go Back</button>

    </div>
  )
}

export default Checking;