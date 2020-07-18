import React from 'react';
import { Admin, Resource} from 'react-admin';
import Dashboard from './Dashboard';
import { PostList } from './posts';
import authProvider from '../services/authProvider';
import adminProvider from '../services/adminProvider';
import UserIcon from '@material-ui/icons/Group';
import { AdminList, AdminEdit, AdminCreate } from './Admins';


import jsonServerProvider from 'ra-data-json-server';


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
      <Resource
       name="posts" 
       list={PostList}
       dataProvider={jsonServerProvider('https://jsonplaceholder.typicode.com')}
      />
    </Admin>
  );
}

export default App;
