// src/redux/store.js
import { createStore } from 'redux';
import themeReducers from './reducers';

const store = createStore(
  themeReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
