This library is a proposal of redux-saga auth flow.
 
Reducer must be mounted at { auth } mount point.

Configuration:
```javascript

import AuthSaga, { reducer as auth } from 'redux-saga-auth';

combineReducers({
  auth
})

saga.run([
  AuthSaga({ 
  saveTokens, //({ user, accessToken, refreshToken }) => throws error on failure
  updateAccessToken, //({ accessToken }) => throws error on failure
  resetTokens // clears tokens above, throws error on failure 
  })
])

```

After[login|register|logout] events are dispatched to use within other sagas to provide the flow you want for your application.

Token storage services must be provided to library sagas.

They might look like:

```javascript
import invariant from 'fbjs/lib/invariant';
import { AsyncStorage } from 'react-native';

const dataKey = '@TokenData';

const accessTokenKey = `${dataKey}:accessToken`;
const refreshTokenKey = `${dataKey}:refreshToken`;
const userKey = `${dataKey}:user`;

export const restoreTokens = () => {
  return Promise.all([
    AsyncStorage.getItem(accessTokenKey),
    AsyncStorage.getItem(refreshTokenKey)
    AsyncStorage.getItem(userKey).then(JSON.parse);
  ])
    .then(data => ({ accessToken: data[0], refreshToken: data[1], user: data[2] }))
    .catch((error) => {
      console.log(`restore ${dataKey} error.`, error);
      return null;
    });
};

export const saveTokens = ({ user, accessToken, refreshToken }) => {
  invariant(accessToken, "Save tokens: Access token must be present");
  invariant(refreshToken, "Save tokens: Refresh token must be present");
  return Promise.all(
    AsyncStorage.setItem(accessTokenKey, accessToken),
    AsyncStorage.setItem(refreshTokenKey, refreshToken),
    AsyncStorage.setItem(userKey, user)
  );
};

export const updateAccessToken = ({ accessToken }) => {
  invariant(accessToken, "Update tokens: Access token must be present");
  return AsyncStorage.setItem(accessTokenKey, accessToken);
};

export const resetTokens = () => {
  return Promise.all([
    AsyncStorage.removeItem(accessTokenKey),
    AsyncStorage.removeItem(refreshTokenKey),
  ]);
};
```