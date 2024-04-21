import { configureStore } from '@reduxjs/toolkit';
import modulesReducer from '../Courses/Modules/modulesReducer';
import quizzesReducer from './quizzesReducer';

export type Lesson = {
  _id: string;
  name: string;
  description: string;
  module: string;
};

export type Module = {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
};

export interface KanbasState {
  quizzesReducer: any;
  modulesReducer: {
    modules: Module[];
    module: Module;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
    quizzesReducer,

  },
});

export default store;
