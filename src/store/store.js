import { combineReducers } from '@reduxjs/toolkit';
import { applyMiddleware, createStore } from 'redux';
import  reducerData from './slice';
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension';

const createRootReducer = () => combineReducers({
    reducerData
  });
    
  export const store = function configureStore(preloadedState) {
      const store = createStore(
        createRootReducer(),
        preloadedState, composeWithDevTools(applyMiddleware(thunk))     
      )
      return store
    }