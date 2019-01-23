import React from 'react'
import ReactDOM from 'react-dom'

/* STYLESHEET */
import './scss/index.scss'

/* COMPONENTS */
import App from './js/components/App'

/* REDUX */
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from './js/reducers/'

import * as serviceWorker from './serviceWorker'

const w: any = window as any;
const devtools: any = w.devToolsExtension ? w.devToolsExtension() : (f: any) => f;
const middleware = applyMiddleware(reduxThunk);
const store: any = middleware(devtools(createStore))(rootReducer);

ReactDOM.render(
	<Provider store={store} >
		<App />
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
