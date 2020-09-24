import React from 'react';
import UsersProvider from './home/UsersProvider';

import ModulesRouter from './ModulesRouter';

const Modules = () => {
  return (
    <>
      <UsersProvider>
        <ModulesRouter />
      </UsersProvider>
    </>
  );
};

export default Modules;
