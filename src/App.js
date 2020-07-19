import React from 'react';
import { Admin, Resource } from 'react-admin';
import Dashboard from './components/dashboard/Dashboard';
import authProvider from './services/authProvider';
import adminProvider from './services/adminProvider';
import UserIcon from '@material-ui/icons/Group';
import { AdminList, AdminEdit, AdminCreate } from './components/admin/Admins';

function App() {
  return (
    <Admin
      dashboard={Dashboard}
      authProvider={authProvider}
      dataProvider={adminProvider}
    >
      <Resource
        name="msadmins"
        list={AdminList}
        edit={AdminEdit}
        create={AdminCreate}
        icon={UserIcon}
      />
    </Admin>
  );
}

export default App;
