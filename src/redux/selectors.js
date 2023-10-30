import { createSelector } from '@reduxjs/toolkit';

// Function selectIsLoading takes a state object and returns the value of the property 'isLoading' from the state object 'contacts'.
export const selectIsLoading = state => state.contacts.isLoading;

// Function selectError takes a state object and returns the value of the property 'error' from the state object 'contacts'.
export const selectError = state => state.contacts.error;

// Function selectContacts takes a state object and returns the value of the property 'items' from the state object 'contacts'.
export const selectContacts = state => state.contacts.items;

// Function selectFilter takes a state object and returns the value of the property 'filter' from the state object.
export const selectFilter = state => state.filter;

// Function 'selectVisibleContacts' uses the 'createSelector' function to create a selector that depends on two other selectors: 'selectContacts' and 'selectFilter'. As a result, the selector 'selectVisibleContacts' returns a filtered array of contacts, where the contact name (contact.name) includes the filter string filter.

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);