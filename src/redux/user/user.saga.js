import { takeLatest, put, call } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { all } from '@redux-saga/core/effects';
import { emailSignInStart, signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.actions';

function* getUserSnapshot (userAuth, additionalData) {
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle () {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield call(getUserSnapshot,user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmailAndPassword ({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield call(getUserSnapshot,user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isAuthenticated () {
    try {
        const userAuth = yield getCurrentUser();
        console.log(userAuth);
        if(!userAuth) return;
        yield put(signInSuccess(userAuth));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signOut () {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp ({payload: {email, password, displayName}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({userAuth: user, additionalData: {displayName}}));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signUpToSignIn ({payload : {userAuth, additionalData}}) {
    yield getUserSnapshot(userAuth, additionalData);
}

export function* onGoogleSignInStart () {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailAndPasswordSignInStart () {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailAndPassword);
}

export function* onCheckUserSession () {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isAuthenticated);
}

export function* onSignOutStart () {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart () {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess () {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signUpToSignIn);
}

export function* userSagas () {
    yield all([
        call(onEmailAndPasswordSignInStart),
        call(onGoogleSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ])
}