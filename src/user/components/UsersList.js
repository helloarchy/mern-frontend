import React from 'react';
import './UsersList.css';
import UserItem from "./UserItem";

const UserList = props => {
    if (props.item.length === 0) {
        return (<div className={'centre'}>
            <h2>No users found!</h2>
        </div>);
    }
    return <ul>
        {props.item.map(user => (
            <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places}
            />
        ))}
    </ul>;
};

export default UserList;