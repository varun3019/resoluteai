import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { database } from '../firebaseConfig'
import { useNavigate, Link } from 'react-router-dom'
import TaskCard from './TaskCard'
import { db } from '../firebaseConfig'
import { child, get, ref } from "firebase/database";


const Task = () => {

    const [tasksList, setTasksList] = useState({
        todo: {},
        in_progress: {},
        done: {}
    });

    const getTaskList = () => {
        get(child(ref(db), `tasks`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const data = snapshot.val();
                const filtered_data = {
                    "todo": {},
                    "in_progress": {},
                    "done": {}
                }
                Object.keys(data).forEach(key => {
                    const item = data[key];
                    filtered_data[item['status']][key] = item;
                    console.log(filtered_data);
                    setTasksList(filtered_data);
                })
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }
    useEffect(() => {
        getTaskList()
    }, [])
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(database).then(val => navigate("/"))
    }
    return (
        <main>
            <div className='bg-black mb-4 '>
                <h2 className='text-white'>Task Managment System</h2>
            </div>
            <div className='d-flex'>
                <div className='col-3 mx-3'>
                    <div className='bg-primary px-3 py-2 rounded'>TODO</div>
                    <div>
                        {Object.keys(tasksList["todo"]).map((key) => {
                            const task = tasksList["todo"][key];
                            console.log('Task:', task)
                            return task ? <TaskCard key={key} props={task} /> : null;
                        })}
                    </div>
                </div>
                <div className='col-3 mx-3'>
                    <div className='bg-warning px-3 py-2 rounded'>In-Progress</div>
                    <div>
                    {Object.keys(tasksList["in_progress"]).map((key) => {
                            const task = tasksList["in_progress"][key];
                            return task ? <TaskCard key={key} props={task} /> : null;
                        })}

                    </div>
                </div>
                <div className='col-3 mx-3'>
                    <div className='bg-success px-3 py-2 rounded'>Done</div>
                    <div>
                    {Object.keys(tasksList["done"]).map((key) => {
                            const task = tasksList["done"][key];
                            return task ? <TaskCard key={key} props={task} /> : null;
                        })}
                    </div>
                </div>
                <div className='col-3 mx-3'>
                    <Link to='/task/createtask' className='btn btn-dark rounded'>Add new Task +</Link>
                </div>

            </div>
            <button onClick={handleSignOut}>Sign Out</button>
        </main>
    )
}

export default Task