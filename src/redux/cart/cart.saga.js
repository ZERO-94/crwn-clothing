import { takeLatest, call, put, all } from "redux-saga/effects";
import { clearCart } from "./cart.action";
import { UserActionTypes } from "../user/user.types";

export function* clearCartSignOut () {
    yield put(clearCart());
}

export function* onSignOutSuccess () {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartSignOut);
}

export function* cartSaga () {
    yield all([
        call(onSignOutSuccess),
    ])
}