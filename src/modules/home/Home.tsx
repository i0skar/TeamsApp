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

const skills = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }];

const Home = () => {
  let selectedSkill: number;
  const { users } = useUsersProvider();
  const { handleCreateUser, generateTeam, resetUsers } = useUsersProvider();

  const selectSkill = (skill: number) => {
    selectedSkill = skill;
  };
  return (
    <>
      <div className={csx.wrapper}>
        <CreateUserForm onSubmit={handleCreateUser} />
        <UserList userList={users} />
        <div className={csx.generate}>
          <h1 className={csx.header}>Generate Team</h1>
          <div>
            <Button className={csx.buttonTactic}>4-4-2</Button>
            <Button className={csx.buttonTactic}>4-5-1</Button>
          </div>
          <div>
            {skills.map((skill) => (
              <Button
                className={csx.buttonSkill}
                key={skill.value}
                onClick={() => selectSkill(skill.value)}
              >
                {skill.value}
              </Button>
            ))}
            {/* <Button className={csx.buttonSkill}>1</Button>
            <Button className={csx.buttonSkill}>2</Button>
            <Button className={csx.buttonSkill}>3</Button>
            <Button className={csx.buttonSkill}>4</Button>
            <Button className={csx.buttonSkill}>5</Button> */}
          </div>
          <Button className={csx.button} onClick={() => generateTeam(selectedSkill)}>
            Generate Team
          </Button>
          <Button className={csx.button} onClick={resetUsers}>
            Reset
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
