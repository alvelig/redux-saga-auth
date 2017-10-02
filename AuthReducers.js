import { handleActions } from 'redux-actions';
import { login, register, logout, tokenRefreshed, tokenRefreshing } from './AuthActions';

const initialState = {
  tokenRefreshing: false
};

export default handleActions({
  [login]: (state, { payload: { user, accessToken, refreshToken }}) => ({
    ...state,
    user,
    accessToken,
    refreshToken,
  }),
  [register]: (state, { payload: { user, accessToken, refreshToken }}) => ({
    ...state,
    user,
    accessToken,
    refreshToken,
  }),
  [tokenRefreshed]: (state, { payload: { accessToken }}) => ({
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