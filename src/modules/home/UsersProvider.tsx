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
    generateTeam?(skill: number): void;
    resetUsers?(): void;
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

  generateTeam = () => {
    const teamTactic = {
      Goalkeeper: 1,
      Defender: 4,
      Midfielder: 4,
      Forward: 2
    };

    const generatedTeam = [];

    this.state.users.sort(() => 0.5 - Math.random());

    const skill = 4;

    Object.keys(teamTactic).forEach((role) => {
      generatedTeam.push(
        ...this.state.users
          .filter(
            (user) => user.role === role && (+user.skill === skill || +user.skill === skill + 1)
          )
          .slice(0, teamTactic[role])
      );
    });

    this.setState({ ...STATE, users: generatedTeam });
  };

  resetUsers = () => {
    this._getUsersFromLocalStorage();
  };

  readonly state: typeof STATE = {
    ...STATE,
    handleCreateUser: this.handleCreateUser,
    generateTeam: this.generateTeam,
    resetUsers: this.resetUsers
  };

  render = () => <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
}

const UsersProvider = Provider;

export const useUsersProvider = () => {
  const context = useContext(Context);

  return context;
};

export default UsersProvider;
