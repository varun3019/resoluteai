import React, { useState } from 'react';
import './signup.css';
import {useNavigate} from 'react-router-dom'
import {database} from '../firebaseConfig.js'
import {db} from '../firebaseConfig.js'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {  ref, set } from "firebase/database";

export default function SignUp() {
  const [login,setLogin]=useState(false);
  const [username,setUsername] =useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e,type) => {
      e.preventDefault();
      const email = user;
      const password = pass;
      if(type=='SignUp')
      {
        createUserWithEmailAndPassword(database,email,password).then(data=>{
        const user = data.user;
        console.log(user);
        alert("Successfully created an user")
        navigate("/");
        setLogin(true);
        set(ref(db, 'users/' + user.uid), {
          username: username,
          email: email,
          id:user.uid
        });
      }).catch(err => console.error("Sign-up error:", err.code, err.message));
      }
      else
      {
       signInWithEmailAndPassword(database,email,password).then(data=>{console.log(data,"authdata")
       navigate("/task")}).
       catch(err => console.error("Sign in error:", err.code, err.message));
      }
      }

    const  handleReset = ()=>
      {
        navigate('/reset');  
      }
  return (
    <div className='signup'>
      <div className='row'>
        <div className={login== false ?'activeColor':'pointer'} onClick={()=>setLogin(false)}>Signup</div>
        <div className={login== true ?'activeColor':'pointer'} onClick={()=>setLogin(true)}>Signin</div>
      </div>
      <h1>{login?'SignIn':'SignUp'}</h1>
      <form onSubmit={(e)=>handleLogin(e,login?"SignIn":"SignUp")}>
      <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="email"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="*******"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <br />
        <p onClick={handleReset}>Forgot Password?</p>
        <button style={{backgroundColor:"black",color:"whitesmoke",width:"100px"}} type="submit" >
        {login?'SignIn':'SignUp'}
        </button>
      </form>
    </div>
  )
}

