import { handleActions } from 'redux-actions';
import { login, register, logout, tokenRefreshed, tokenRefreshing } from './AuthActions';

const initialState = {
  tokenRefreshing: false
};

export default handleActions({
  [login]: (state, { accessToken, refreshToken }) => ({
    ...state,
    accessToken,
    refreshToken,
  }),
  [register]: (state, { accessToken, refreshToken }) => ({
    ...state,
    accessToken,
    refreshToken,
  }),
  [tokenRefreshed]: (state, { accessToken }) => ({
    ...state,
    accessToken,
    tokenRefreshing: false
  }),
  [tokenRefreshing]: (state) => ({
    ...state,
    tokenRefreshing: true
  }),
  [logout]: (state) => initialState
}, initialState);
