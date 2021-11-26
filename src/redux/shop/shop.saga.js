import { takeLatest, all, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'; 
import {
    fetchCollectionSuccess, fetchCollectionFailure
} from './shop.action';

import ShopActionTypes from './shop.types';


export function* fetchCollectionsAsync() {
    yield console.log("i am fired");

    try {
        const collectionsRef = firestore.collection('collections');
        const snapshot = yield collectionsRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionFailure);
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export function* shopSaga() {
    yield all([
        call(fetchCollectionsStart),
    ])
}