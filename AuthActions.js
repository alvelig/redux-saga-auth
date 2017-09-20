import { createAction } from 'redux-actions';

const ENTITY = '@@AUTH';

export const login = createAction(`${ENTITY}/LOGIN`);
export const afterLogin = createAction(`${ENTITY}/LOGIN_AFTER`);
export const register = createAction(`${ENTITY}/REGISTER`);
export const afterRegister = createAction(`${ENTITY}/REGISTER_AFTER`);
export const tokenRefreshing = createAction(`${ENTITY}/TOKEN_REFRESHING`);
export const tokenRefreshed = createAction(`${ENTITY}/TOKEN_REFRESHED`);
export const logout = createAction(`${ENTITY}/LOGOUT`);
export const afterLogout = createAction(`${ENTITY}/LOGOUT_AFTER`);