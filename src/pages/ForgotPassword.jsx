import { sendPasswordResetEmail } from 'firebase/auth';
import {database} from '../firebaseConfig'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './forgot.css'

const ForgotPassword = () => {

    const naviagate = useNavigate();
    const [email,setEmail] =useState('')

    const handleSubmit = async(e)=>
    {
        e.preventDefault();
        const emailVal = email;
        sendPasswordResetEmail(database,emailVal).then(data=>{alert("Check your Gmail"); naviagate("/signup")}).catch(err=>(alert(err.code)))

    }
    return (
        <div className='forgot'>
            <h2>Forgot Password</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input type="email" placeholder='Please Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} /> <br /><br />
                <button type='submit'>Reset</button>
            </form>
        </div>
    )
}

export default ForgotPassword 