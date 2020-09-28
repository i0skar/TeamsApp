import React from 'react';
import CreateUserForm from '../create-user-form';
import UserList from '../user-list';
import { useUsersProvider } from './UsersProvider';

import csx from './Home.scss';
import { Button } from 'ui';

interface State {
  sent: boolean;
}

const STATE: State = {
  sent: false
};

const Home = () => {
  const { users } = useUsersProvider();
  const { handleCreateUser, generateTeam, resetUsers } = useUsersProvider();

  return (
    <>
      <div className={csx.wrapper}>
        <CreateUserForm onSubmit={handleCreateUser} />
        <UserList userList={users} />
      </div>
      <div className={csx.generate}>
        <Button onClick={generateTeam}>Generate Team</Button>
        <Button onClick={resetUsers}>Reset</Button>
      </div>
    </>
  );
};

export default Home;
