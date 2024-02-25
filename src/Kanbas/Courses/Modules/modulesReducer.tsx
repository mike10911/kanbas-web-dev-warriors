import { createSlice } from '@reduxjs/toolkit';
import { modules } from '../../Database';

const initialState = {
  modules: modules,
  module: {
    _id: 'M' + new Date().getTime().toString(),
    name: 'The World is Run By Cats',
    description:
      'Learn how cats are an important part of culture around the world!',
    course: '',
  },
};

const modulesSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {
    addModule: (state, action) => {
      state.modules = [
        {
          ...action.payload,
          _id: 'M' + new Date().getTime().toString(),
        },
        ...state.modules,
      ];
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (module) => module._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((module) =>
        module._id === action.payload._id ? action.payload : module
      );
    },
    setModule: (state, action) => {
      state.module = action.payload;
    },
  },
});

export const { addModule, deleteModule, updateModule, setModule } =
  modulesSlice.actions;
export default modulesSlice.reducer;
