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

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionsTypes.AUTH_LOGOUT
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expDate = new Date(localStorage.getItem('expirationDate'));
            if (expDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const expTime = (expDate.getTime() - new Date().getTime()) / 1000;
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expTime));
            }
        }
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
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
                const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expDate);
                localStorage.setItem('userId', res.data.localId);
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