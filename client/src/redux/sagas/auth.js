import { takeEvery, takeLatest, put, call, fork } from 'redux-saga/effects'
import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOAD_USER_REQUEST,
	USER_LOADED,
	AUTH_ERROR,
} from './../constants'
import { registerUser, loginUser, keepLogged } from './../api/auth'
import setAuthToken from './../../utils/setAuthToken'

function* watchRegister() {
	yield takeLatest(REGISTER_REQUEST, workerRegister)
}

function* workerRegister({ action }) {
	try {
		const res = yield call(registerUser, action)
		yield put({ type: REGISTER_SUCCESS, payload: res.token })
		yield call(workerKeepLogged)
	} catch (error) {
		yield put({ type: REGISTER_FAIL, payload: error })
	}
}

function* watchLogin() {
	yield takeLatest(LOGIN_REQUEST, workerLogin)
}

function* workerLogin({ action }) {
	try {
		const res = yield call(loginUser, action)
		yield put({ type: LOGIN_SUCCESS, payload: res.token })
		yield call(workerKeepLogged)
	} catch (error) {
		yield put({ type: LOGIN_FAIL, payload: error })
	}
}

function* watchKeepLogged() {
	yield takeEvery(LOAD_USER_REQUEST, workerKeepLogged)
}

function* workerKeepLogged() {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}
	try {
		const res = yield keepLogged()
		yield put({ type: USER_LOADED, payload: res })
	} catch (error) {
		yield put({ type: AUTH_ERROR, payload: error })
	}
}

const userSagas = [fork(watchRegister), fork(watchKeepLogged), fork(watchLogin)]

export default userSagas
