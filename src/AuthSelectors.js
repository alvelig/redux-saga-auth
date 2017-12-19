const localState = (state, mount = 'auth') => state[mount];

export const isTokenRefreshing = (state, mount) => localState(state, mount).tokenRefreshing;
export const selectAccessToken = (state, mount) => localState(state, mount).accessToken;
export const selectRefreshToken = (state, mount) => localState(state, mount).refreshToken;
export const selectUser = (state, mount) => localState(state, mount).user;
