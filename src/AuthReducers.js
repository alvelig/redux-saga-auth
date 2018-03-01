import { handleActions } from 'redux-actions';
import { login, register, logout, tokenRefreshed, tokenRefreshing } from './AuthActions';

const initialState = {
  tokenRefreshing: false
};

export default handleActions({
  [login]: (state, { payload: { user, accessToken, refreshToken }}) =>
    Object.assign({}, state, {
      user,
      accessToken,
      refreshToken,
    }),
  [register]: (state, { payload: { user, accessToken, refreshToken }}) =>
    Object.assign({}, state, {
      user,
      accessToken,
      refreshToken,
    }),
  [tokenRefreshed]: (state, { payload: { accessToken }}) =>
    Object.assign({}, state, {
      accessToken,
      tokenRefreshing: false
    }),
  [tokenRefreshing]: (state) =>
    Object.assign({}, state, {
      tokenRefreshing: true
    }),
  [logout]: (state) => Object.assign({}, initialState)
}, initialState);