import React from 'react';

import csx from './user-list.scss';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const UserList = ({ userList }) => {
  return (
    <>
      <div className={csx.userListWrapper}>
        <h1 className={csx.userListHeader}>User List</h1>
        <ul className={csx.list}>
          {userList.map((user, index) => (
            <li key={index}>
              <div className={csx.listItem}>
                <AccountCircleIcon className={csx.userIcon} />
                <div className={csx.userInfo}>
                  <div className={csx.userName}>{user.name}</div>
                  <div className={csx.roleAndSkill}>
                    <div>{user.role}</div>
                    <div>{user.skill}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserList;
