import { compose, createStore, applyMiddleware } from "redux";
// import logger from 'redux-logger';

import { rootReducer } from "./root-reducer";

// create my own logger middleware
const loggerMiddleware = (store) => (next) => (action) => {
  // chained curry func - reusable middleware functions.
  if (!action.type) {
    return next(action);
  }

  // log actions, previous and next state
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
