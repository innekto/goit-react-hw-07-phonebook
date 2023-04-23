import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleContactAction = (state, action) => {
  if (action.type === fetchContacts.fulfilled.type) {
    state.items = action.payload;
  } else {
    state.items = state.items.filter(item => item.id !== action.payload.id);
  }
  state.isLoading = false;
  state.error = null;
};

const extraActions = [fetchContacts, addContact, deleteContact];
const getActions = type => isAnyOf(...extraActions.map(action => action[type]));

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },

  reducers: {
    filterChange(state, action) {
      state.filter = action.payload.toLowerCase();
    },
  },

  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchContacts.pending, handlePending)
  //     .addCase(fetchContacts.fulfilled, (state, action) => {
  //       state.items = action.payload;
  //       state.isLoading = false;
  //       state.error = null;
  //     })
  //     .addCase(fetchContacts.rejected, handleRejected)
  //     .addCase(addContact.pending, handleRejected)
  //     .addCase(addContact.fulfilled, (state, action) => {
  //       state.items = state.items.filter(item => item.id !== action.payload.id);
  //       state.isLoading = false;
  //       state.error = null;
  //     })
  //     .addCase(addContact.rejected, handleRejected)
  //     .addCase(deleteContact.pending, handlePending)
  //     .addCase(deleteContact.fulfilled, (state, action) => {
  //       state.items = state.items.filter(item => item.id !== action.payload.id);
  //       state.isLoading = false;
  //       state.error = null;
  //     })
  //     .addCase(deleteContact.rejected, handleRejected);
  // },
  extraReducers: builder => {
    builder
      .addMatcher(getActions('pending'), handlePending)
      .addMatcher(getActions('rejected'), handleRejected)
      .addMatcher(getActions('fulfilled'), handleContactAction);
  },
});

export const { filterChange } = phonebookSlice.actions;
export const PhonebookReducer = phonebookSlice.reducer;
