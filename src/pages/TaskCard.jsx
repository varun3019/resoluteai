import React from 'react';

const TaskCard = ({ props }) => {
    
    if (!props) {
        return <div>Task details not available</div>;
    }

    const { assigned_user, deadline, description, status, title } = props;

    if (!title) {
        return <div>Title not available</div>;
    }

    return (
        <div className='bg-light'>
            <div className='card mt-3 shadow-small'>
                <div className='card-body'>
                    <h5 className='card-title'>{title}</h5>
                    <p className='card-text'>Assigned User: {assigned_user}</p>
                    <p className='card-text'>Deadline: {deadline}</p>
                    <p className='card-text'>Description: {description}</p>
                    <p className='card-text'>Status: {status}</p>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
