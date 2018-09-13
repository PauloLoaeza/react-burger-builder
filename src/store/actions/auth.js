import * as actionsTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => ({
    type: actionsTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
    type: actionsTypes.AUTH_SUCCESS,
    idToken: token,
    userId
});

export const authFail = (error) => ({
    type: actionsTypes.AUTH_FAIL,
    error
});

export const logout = () => ({
    type: actionsTypes.AUTH_LOGOUT
});

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const apiKey = 'AIzaSyCGVNrbAZ-Q_04XMfz6Zsqth8PlKg11spI';
        const url = isSignUp
            ? `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`
            : `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

        const auth = {
            email,
            password,
            returnSecureToken: true
        }

        axios
            .post(url, auth)
            .then(res => {
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn))
            })
            .catch(err => dispatch(authFail(err.response.data.error)));
    }
}

export const setAuthRedirectPath = (path) => ({
    type: actionsTypes.SET_AUTH_REDIRECT_PATH,
    path
});