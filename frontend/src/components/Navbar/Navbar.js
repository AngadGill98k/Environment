import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    let navigate=useNavigate()
    return (
        <>
            <div onClick={()=>{navigate("/home")}}>
                <span>logo</span>
                <span>wbsite name</span>
            </div>


            <div>
                <button onClick={()=>{navigate("/forums")}}>Forums</button>
                <button onClick={()=>{navigate("/admin")}}>admin</button>
                <button onClick={()=>{navigate("/user")}}>user</button>
                {/* <button onClick={()=>{navigate("/")}}>Login</button> */}
            </div>
        </>
    )
}

export default Navbar