
import { initializeApp } from "firebase/app"; 
import {getAuth} from 'firebase/auth'
import {getDatabase} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyD_lIU95sXAzIJwFa7k245sPa2e4FMCHPk",
  authDomain: "resoluteauth.firebaseapp.com",
  projectId: "resoluteauth",
  storageBucket: "resoluteauth.appspot.com",
  messagingSenderId: "125664552480",
  appId: "1:125664552480:web:ccee31b35e4d08166a7e45"
};


const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
export const db= getDatabase(app)