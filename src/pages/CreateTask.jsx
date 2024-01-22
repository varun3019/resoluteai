import { v4 as uuidv4 } from "uuid";
import { database, db } from "../firebaseConfig";
import { child, get, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CreateTask() {
    const [user, setUser] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [formData, setFormData] = useState({
        title: null,
        description: null,
        status: null,
        assigned_user: null,
        deadline: null
    })

    const getUsersList = () => {
        get(child(ref(db), `users`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUsersList(Object.values(data));
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        setUser(database.currentUser);
        getUsersList();
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const taskId = uuidv4();
        setFormData({...formData, ['created_by']: user.uid});
        set(ref(db, "tasks/" + taskId), formData);
    };

    return (
        <div>
          <div style={{display:'flex',justifyContent:"center"}}>
            <Link to = '/' style={{textAlign:"center",color:"black",textDecoration:"none"}}>Task Mangament System</Link>
          </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Task title"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            name="description"
                            id="exampleFormControlTextarea1"
                            rows="6"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="d-flex">
                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="status" className="form-label">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option>Select Status</option>
                                <option value="todo">TODO</option>
                                <option value="in_progress">In Proress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="assigned_user" className="form-label">
                                Assigned User
                            </label>
                            <select
                                id="assigned_user"
                                name="assigned_user"
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option>Select a user</option>
                                {usersList.map((item) => {
                                    return (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >{`${item.username} <${item.email}>`}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="deadline" className="form-label">
                                Deadline
                            </label>
                            <input
                                className="form-control"
                                name="deadline"
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                  <Link to= '/task'><button className="btn btn-success w-100" type="submit" >
                        Create New Task
                    </button></Link>  
                </form>
            </div>
        </div>
    );
}
