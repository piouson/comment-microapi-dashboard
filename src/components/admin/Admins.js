import React from "react";
import { useMediaQuery } from '@material-ui/core';
import {
  List, Datagrid, TextField, EmailField, SimpleList,
  SimpleForm, Edit, TextInput, Create, Show, required,
  SimpleShowLayout, PasswordInput,
} from "react-admin";

export const AdminList = props => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <List label="Admins" {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.title}
          secondaryText={record => `${record.views} views`}
          tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
        />
      ) : (
          <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="fullname" />
            <EmailField source="email" />
            <TextField source="role" />
          </Datagrid>
        )}
    </List>)
};

export const AdminEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput label="Full Name" source="fullname" />
      <TextInput disabled source="email" />
      <TextInput disabled source="role" />
    </SimpleForm>
  </Edit>
);

export const AdminCreate = props => {
  /*const search_id = parse(props.location.search);
  console.log("ADMINID", JSON.stringify(search_id));
  const { admin_id: admin_id_string } = search_id;
  const admin_id = admin_id_string || "";
  const redirect = admin_id ? `/msadmins/${admin_id}` : false;*/
  return (
    <Create label="Create" {...props}>
      <SimpleForm redirect="show">
        <TextInput label="Full Name" source="fullname" validate={[required()]} />
        <TextInput source="email" validate={[required()]} />
        <PasswordInput source="password" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
}

export const AdminShow = props => (
  <Show label="Show" {...props}>
    <SimpleShowLayout>
      <TextField label="Full Name" source="fullname" />
      <TextField source="email" />
      <TextField source="password" />
      <TextField source="role" />
    </SimpleShowLayout>
  </Show>
);
