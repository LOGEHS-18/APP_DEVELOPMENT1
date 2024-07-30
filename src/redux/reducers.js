// src/redux/themeReducer.js
import { SET_THEME } from "./actions";

const initialState = {
  theme: 'light',
};

const themeReducers= (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducers;
