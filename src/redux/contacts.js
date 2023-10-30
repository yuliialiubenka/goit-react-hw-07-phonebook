import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations';

const getActions = type => isAnyOf(fetchContacts[type], addContacts[type], deleteContacts[type])

const initialState = {
  items: [],
  isLoading: false,
  error: null
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      // Handling successful execution of fetchContacts
      .addCase(fetchContacts.fulfilled, (state, action) => {
        // Update contact list in state
        state.items = action.payload;
      })
      // Handling successful execution of addContacts
      .addCase(addContacts.fulfilled, (state, action) => {
        // Adding a new contact to the beginning of the contact list
        state.items.unshift(action.payload);
      })
      // Handling successful execution of deleteContacts
      .addCase(deleteContacts.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        // Removing a contact from the contact list
        state.items.splice(index, 1);
      })
      // Processing actions with a status of 'pending'
      .addMatcher(getActions('pending'), state => {
        state.isLoading = true;
      })
      // Processing actions with a status of 'rejected'
      .addMatcher(getActions('rejected'), (state, action) => {
        state.isLoading = false;
        // Setting the error message
        state.error = action.payload;
      })
      // Processing actions with a status of 'fulfilled'
      .addMatcher(getActions('fulfilled'), state => {
        state.isLoading = false;
        // Resetting the error message
        state.error = null;
      }),
});

// Export addContact and deleteContact actions from slice contacts
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;