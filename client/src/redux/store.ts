import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import rootReducer from './reducers'
import rootSaga from './sagas/index'

const initialState = {}

const sagaMiddleware = createSagaMiddleware()

const middleware = [logger, sagaMiddleware]

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

export default store
