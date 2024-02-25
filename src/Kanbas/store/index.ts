import { configureStore } from '@reduxjs/toolkit';
import modulesReducer from '../Courses/Modules/modulesReducer';

/**
 * "_id": "M101",
    "name": "Introduction to Rocket Propulsion",
    "description": "Basic principles of rocket propulsion and rocket engines.",
    "course": "RS101",
    "lessons": [
      {
        "_id": "L101",
        "name": "History of Rocketry",
        "description": "A brief history of rocketry and space exploration.",
        "module": "M101"
      },
      {
        "_id": "L102",
        "name": "Rocket Propulsion Fundamentals",
        "description": "Basic principles of rocket propulsion.",
        "module": "M101"
      },
      {
        "_id": "L103",
        "name": "Rocket Engine Types",
        "description": "Overview of different types of rocket engines.",
        "module": "M101"
      }
    ]
 */
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
  modulesReducer: {
    modules: Module[];
    module: Module;
  };
}
const store = configureStore({
  reducer: {
    modulesReducer,
  },
});

export default store;
