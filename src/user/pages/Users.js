import React, {useEffect, useState} from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';

const Users = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  // Fetch users only on first load of component
  useEffect(() => {
    // Don't await - useEffect doesn't like async - use an iffy function
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/users');
        setLoadedUsers(responseData.users);
      } catch (err) {
        // Errors handled by sendRequest
        console.log(err.message);
      }
    };
    fetchUsers(); // Execute immediately
  }, [
    // Dependencies
      sendRequest
  ]);

  return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className={'center'}>
              <LoadingSpinner/>
            </div>
        )}
        {!isLoading && loadedUsers && (
            <UsersList items={loadedUsers}/>
        )}
      </React.Fragment>
  );
};

export default Users;
