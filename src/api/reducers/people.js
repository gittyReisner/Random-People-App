    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import { fetchPeople, savePerson, deletePerson, updatePerson, fetchSavedPeople } from '../index';

    const initialState = {
      loading: false,
      people:  [],
      error: null,
    };

    export const fetchPeopleAsync = createAsyncThunk(
      'profiles/fetchPeople',
      async () => {
        try {
          const results = await fetchPeople();
          return results;
        } catch (error) {
        }
      }
    );
    export const savePersonAsync = createAsyncThunk('profiles/save', async (person) => {
      const response = await savePerson(person);
      return response;
    });

    export const deletePersonAsync = createAsyncThunk('profiles/delete', async (id) => {
      await deletePerson(id);
      return id;
    });

    export const updatePersonAsync = createAsyncThunk('profiles/update', async ({ id, person }) => {
      const response = await updatePerson(id, person);
      return response;
    });

    export const fetchSavedPeopleAsync = createAsyncThunk('profiles/fetchSaved', async () => {
      const response = await fetchSavedPeople();
      return response;
    });

    export const peopleSlice = createSlice({
      name: 'people',
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchPeopleAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchPeopleAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.people = action.payload;
          })
          .addCase(fetchPeopleAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(savePersonAsync.fulfilled, (state, action) => {
            state.people = [...state.people, action.payload];
          })
          .addCase(deletePersonAsync.fulfilled, (state, action) => {
            state.people = state.people.filter(person => person.id !== action.payload);
          })
          .addCase(updatePersonAsync.fulfilled, (state, action) => {
            const index = state.people.findIndex(person => person.id === action.payload.id);
            state.people[index] = action.payload;
          })
          .addCase(fetchSavedPeopleAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchSavedPeopleAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.people = action.payload;
          })
          .addCase(fetchSavedPeopleAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
      },
    });

    export default peopleSlice.reducer;