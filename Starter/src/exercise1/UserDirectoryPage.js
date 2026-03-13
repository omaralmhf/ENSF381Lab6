import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';
import { useState, useEffect } from 'react';

function UserDirectoryPage() {
  // TODO: add users, sortBy, and viewMode state in this component.
  // TODO: fetch the initial users with useEffect.
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');
  const api = 'https://69a23923be843d692bd10398.mockapi.io/users_api';

  useEffect(() => {
     fetch(api)
      .then(response => response.json())
      .then(data => setUsers(data));


  }, []);


  function handleDeleteClick(userId) {
    console.log('TODO: delete the user with id', userId);
    fetch(api + '/' + userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      });
  }

  function handleSortByGroupClick() {
    // sorting by id, using sorted array and updating state
    console.log('TODO: sort users by user_group');
    const usersList = [...users];
    usersList.sort((a, b) => {
      if (a.user_group < b.user_group) {
        return -1;
      }
      if (a.user_group > b.user_group) {
        return 1;
      }
      return 0;
    });
    setUsers(usersList);
  }

  function handleSortByIdClick() {
    console.log('TODO: sort users by id');
    const usersList = [...users];
    usersList.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setUsers(usersList);
  }

  function handleViewToggleClick() {
    console.log('TODO: switch between grid and list layouts');
    if (viewMode === 'grid') {
      setViewMode('list');
    } else {
      setViewMode('grid');
    }
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls 
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
