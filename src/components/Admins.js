import React from "react";
import { useMediaQuery } from '@material-ui/core';
import {
  List, Datagrid, TextField, EmailField, SimpleList,
  SimpleForm, Edit, TextInput, Create, ReferenceInput,
  SelectInput,
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
          <Datagrid rowClick="edit">
            <TextField source="msAdminId" />
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
      <TextInput source="msAdminId" />
      <TextInput source="fullname" />
      <TextInput source="email" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
);

export const AdminCreate = props => (
  <Create label="Create" {...props}>
    <SimpleForm>
      <TextInput source="fullname" />
      <TextInput source="email" />
      <TextInput source="password" />
      <ReferenceInput source="role" reference="msadmins">
        <SelectInput optionText="role" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
