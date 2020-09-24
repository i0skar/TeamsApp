import React, { createContext, ReactNode, useContext } from 'react';

interface User {
  name: string;
  role: string;
  skill: string;
}

namespace UserProvider {
  export interface State {
    users: User[];
    handleCreateUser?(credentials: any): void;
  }

  export interface Props {
    children: ReactNode;
  }
}

const STATE: UserProvider.State = {
  users: []
};

const Context = createContext(STATE);

class Provider extends React.Component<UserProvider.Props, typeof STATE> {
  private _getUsersFromLocalStorage = () => {
    const userList = '[' + localStorage.getItem('users') + ']';
    this.setState({ ...STATE, users: JSON.parse(userList) });
  };

  private _saveUserToLocalStorage = (user: string) => {
    const userList = localStorage.getItem('users');
    if (userList === null) {
      localStorage.setItem('users', user);
    } else {
      localStorage.setItem('users', userList + ',' + user);
    }
  };

  componentDidMount() {
    const userList = localStorage.getItem('users');
    if (userList === null) {
      return;
    }
    this._getUsersFromLocalStorage();
  }

  handleCreateUser = (user: string) => {
    this._saveUserToLocalStorage(JSON.stringify(user));
    this._getUsersFromLocalStorage();
  };

  readonly state: typeof STATE = {
    ...STATE,
    handleCreateUser: this.handleCreateUser
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const UsersProvider = Provider;

export const useUsersProvider = () => {
  const context = useContext(Context);

  return context;
};

export default UsersProvider;
