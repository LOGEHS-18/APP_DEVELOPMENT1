// src/redux/themeActions.js
export const SET_THEME = 'SET_THEME';
//incremnet
//decerernt
export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});
