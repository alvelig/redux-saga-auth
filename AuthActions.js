'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterLogout = exports.logout = exports.tokenRefreshed = exports.tokenRefreshing = exports.afterRegister = exports.register = exports.afterLogin = exports.login = undefined;

var _reduxActions = require('redux-actions');

var ENTITY = '@@AUTH';

var login = exports.login = (0, _reduxActions.createAction)(ENTITY + '/LOGIN');
var afterLogin = exports.afterLogin = (0, _reduxActions.createAction)(ENTITY + '/LOGIN_AFTER');
var register = exports.register = (0, _reduxActions.createAction)(ENTITY + '/REGISTER');
var afterRegister = exports.afterRegister = (0, _reduxActions.createAction)(ENTITY + '/REGISTER_AFTER');
var tokenRefreshing = exports.tokenRefreshing = (0, _reduxActions.createAction)(ENTITY + '/TOKEN_REFRESHING');
var tokenRefreshed = exports.tokenRefreshed = (0, _reduxActions.createAction)(ENTITY + '/TOKEN_REFRESHED');
var logout = exports.logout = (0, _reduxActions.createAction)(ENTITY + '/LOGOUT');
var afterLogout = exports.afterLogout = (0, _reduxActions.createAction)(ENTITY + '/LOGOUT_AFTER');