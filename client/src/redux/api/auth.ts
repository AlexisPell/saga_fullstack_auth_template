import axios, { AxiosPromise } from 'axios'

export const loginUser = async (form) => {
	const res = await axios.post<AxiosPromise>(
		'http://localhost:5000/api/auth/login',
		JSON.stringify(form),
		{ headers: { 'Content-Type': 'application/json' } }
	)
	return res.data
}

export const registerUser = async (form) => {
	const res = await axios.post<AxiosPromise>(
		'http://localhost:5000/api/auth/register',
		JSON.stringify(form),
		{ headers: { 'Content-Type': 'application/json' } }
	)
	return res.data
}

export const keepLogged = async () => {
	const res = await axios.get<AxiosPromise>('http://localhost:5000/api/auth/me')
	return res.data
}
