import React, { useReducer } from 'react';
// import * as uuid from 'uuid';
import axios from 'axios';

import ContactContext from './contactContext';
import ContactReducer from './contactReducer';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    try {
      const response = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: response.data });
    } catch (error) {
      dispatch({ type: CONTACT_ERROR, payload: error.response.data.msg });
    }
  };

  // Add Contact
  const addContact = async (contact) => {
    // contact.id = uuid.v4();
    try {
      const response = await axios.post('/api/contacts', contact, { headers: { 'Content-Type': 'application/json' } });
      dispatch({
        type: ADD_CONTACT,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.msg
      });
    }
  };

  // Update Contact
  const updateContact = async (contact) => {
    try {
      const response = await axios.put(`/api/contacts/${contact._id}`, contact, {
        headers: { 'Content-Type': 'application/json' }
      });
      dispatch({
        type: UPDATE_CONTACT,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.msg
      });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.data.msg
      });
    }
  };

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        loading: state.loading,
        error: state.error,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
