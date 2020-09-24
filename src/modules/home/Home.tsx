import React from 'react';
import CreateUserForm from '../create-user-form';
import UserList from '../user-list';
import { useUsersProvider } from './UsersProvider';

import csx from './Home.scss';

interface State {
  sent: boolean;
}

const STATE: State = {
  sent: false
};

const Home = () => {
  const { users } = useUsersProvider();
  const { handleCreateUser } = useUsersProvider();

  return (
    <>
      <div className={csx.wrapper}>
        <CreateUserForm onSubmit={handleCreateUser} />
        <UserList userList={users} />
      </div>
    </>
  );
};

export default Home;
