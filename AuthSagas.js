'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutSaga = logoutSaga;
exports.initAuthSaga = initAuthSaga;
exports.default = AuthSagas;

var _invariant = require('fbjs/lib/invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _effects = require('redux-saga/effects');

var _AuthActions = require('./AuthActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(logoutSaga),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(initAuthSaga),
    _marked3 = /*#__PURE__*/regeneratorRuntime.mark(AuthSagas);

var isRunning = false;

function logoutSaga(resetTokens) {
  return regeneratorRuntime.wrap(function logoutSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.put)((0, _AuthActions.afterLogout)());

        case 2:
          _context.next = 4;
          return (0, _effects.call)(resetTokens);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function initAuthSaga(restoreTokens, resetTokens) {
  var tokens;
  return regeneratorRuntime.wrap(function initAuthSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          (0, _invariant2.default)(isRunning, "AuthSaga watcher must be running before initAuthSaga to capture login action on init. Did you forget to start AuthSaga?");

          _context2.next = 3;
          return (0, _effects.call)(restoreTokens);

        case 3:
          tokens = _context2.sent;

          if (!(tokens && tokens.refreshToken)) {
            _context2.next = 9;
            break;
          }

          _context2.next = 7;
          return (0, _effects.put)((0, _AuthActions.login)(tokens));

        case 7:
          _context2.next = 12;
          break;

        case 9:
          _context2.next = 11;
          return (0, _effects.put)((0, _AuthActions.logout)());

        case 11:
          return _context2.delegateYield(logoutSaga(resetTokens), 't0', 12);

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function AuthSagas(_ref) {
  var saveTokens = _ref.saveTokens,
      updateAccessToken = _ref.updateAccessToken,
      resetTokens = _ref.resetTokens;

  var _ref2, type, payload, accessToken, refreshToken, user, _ref3, refresh, loggedOut;

  return regeneratorRuntime.wrap(function AuthSagas$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          isRunning = true;

        case 1:
          if (!true) {
            _context3.next = 43;
            break;
          }

          _context3.next = 4;
          return (0, _effects.take)(['' + _AuthActions.login, '' + _AuthActions.register]);

        case 4:
          _ref2 = _context3.sent;
          type = _ref2.type;
          payload = _ref2.payload;
          accessToken = payload.accessToken, refreshToken = payload.refreshToken, user = payload.user;
          _context3.prev = 8;
          _context3.next = 11;
          return saveTokens({ accessToken: accessToken, refreshToken: refreshToken, user: user });

        case 11:
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3['catch'](8);

          console.error(_context3.t0);
          return _context3.abrupt('continue', 1);

        case 17:
          _context3.next = 19;
          return (0, _effects.put)(type === '' + _AuthActions.register ? (0, _AuthActions.afterRegister)() : (0, _AuthActions.afterLogin)());

        case 19:
          if (!true) {
            _context3.next = 40;
            break;
          }

          _context3.next = 22;
          return (0, _effects.race)({
            refresh: (0, _effects.take)('' + _AuthActions.tokenRefreshed),
            loggedOut: (0, _effects.take)('' + _AuthActions.logout)
          });

        case 22:
          _ref3 = _context3.sent;
          refresh = _ref3.refresh;
          loggedOut = _ref3.loggedOut;

          if (!loggedOut) {
            _context3.next = 29;
            break;
          }

          return _context3.abrupt('break', 40);

        case 29:
          if (!refresh) {
            _context3.next = 38;
            break;
          }

          _context3.prev = 30;
          _context3.next = 33;
          return (0, _effects.call)(updateAccessToken, refresh.payload);

        case 33:
          _context3.next = 38;
          break;

        case 35:
          _context3.prev = 35;
          _context3.t1 = _context3['catch'](30);

          console.error(_context3.t1);

        case 38:
          _context3.next = 19;
          break;

        case 40:
          return _context3.delegateYield(logoutSaga(resetTokens), 't2', 41);

        case 41:
          _context3.next = 1;
          break;

        case 43:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked3, this, [[8, 13], [30, 35]]);
}