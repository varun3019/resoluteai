import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Task from './pages/Task';
import CreateTask from './pages/CreateTask';
import ForgotPassword from './pages/ForgotPassword';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
   <Routes>
   <Route path='/task' element = {<Task/>}/>
   <Route path='/' element = {<SignUp/>}/>
   <Route path='/reset' element = {<ForgotPassword/>}/>
   <Route path='/task/createtask' element = {<CreateTask/>}/>
   </Routes>
  </BrowserRouter>
  );
}

export default App;
