import {
	REGISTER_REQUEST,
	LOGIN_REQUEST,
	LOAD_USER_REQUEST,
	LOGOUT,
} from './../constants'

export const register = (form) => ({ type: REGISTER_REQUEST, action: form })

export const login = (form) => {
	return {
		type: LOGIN_REQUEST,
		action: form,
	}
}

export const keepLogged = () => ({ type: LOAD_USER_REQUEST })

export const logout = () => ({ type: LOGOUT })
