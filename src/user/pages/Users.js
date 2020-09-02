import React from 'react';
import UserList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            image: 'https://www.onthisday.com/images/people/john-smith-medium.jpg',
            name: 'John Smith',
            places: 3
        },
        {
            id: 'u2',
            image: 'https://lezwatchtv.com/wp-content/uploads/2016/03/questionmarkface-350x412.jpg',
            name: 'Jane Doe',
            places: 5
        }
    ];

    return <UserList items={USERS} />;
};

export default Users;