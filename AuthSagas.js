import invariant from 'fbjs/lib/invariant';
import { call, put, race, take } from 'redux-saga/effects';
import { login, afterLogin, logout, afterLogout, register, afterRegister, tokenRefreshed } from './AuthActions';

let isRunning = false;

export function *logoutSaga (resetTokens) {
  yield put(afterLogout());
  yield call(resetTokens);
}

export function *initAuthSaga(restoreTokens, resetTokens) {
  invariant(isRunning, "AuthSaga watcher must be running before initAuthSaga to capture login action on init. Did you forget to start AuthSaga?");

  const tokens = yield call(restoreTokens);

  if(tokens && tokens.refreshToken) {
    yield put(login(tokens));
  } else {
    yield put(logout()); //just in case of, in this part store should be still empty, but anyway
    yield* logoutSaga(resetTokens);
  }
}

export default function *AuthSagas({ saveTokens, updateAccessToken, resetTokens }) {
  isRunning = true;

  while(true) {

    const { type, payload } = yield take([`${login}`, `${register}`]);
    const { accessToken, refreshToken, user } = payload;
    try {
      yield saveTokens({ accessToken, refreshToken, user });
    } catch (e) {
      console.error(e);
      continue;
    }

    yield put( type === `${register}` ? afterRegister() : afterLogin());

    while(true) {
      //Wait for token refresh or logout
      const { refresh, loggedOut } = yield race({
        refresh: take(`${tokenRefreshed}`),
        loggedOut: take(`${logout}`)
      });

      if (loggedOut) {
        break;
      } else if(refresh) {
        try {
          yield put(updateAccessToken(refresh.payload));
        } catch (e) {
          console.error(e);
        }
      }
    }

    yield* logoutSaga(resetTokens);
  }

}