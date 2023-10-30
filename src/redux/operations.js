import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://653aa53f2e42fd0d54d4444f.mockapi.io';

// Creating an async Thunk-action fetchContacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll', // A unique string identifying this action
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Creating an async Thunk-action addContacts
export const addContacts = createAsyncThunk(
  'contacts/addContacts', // A unique string identifying this action
  async ({ name, number }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Creating an async Thunk-action deleteContacts
export const deleteContacts = createAsyncThunk(
  'contacts/deleteContacts', // A unique string identifying this action
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
