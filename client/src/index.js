import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import {GoogleOAuthProvider} from '@react-oauth/google';

// initialize redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './store/reducers';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));



ReactDOM.render(
	<GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
		<Provider store={store}>
			<App/>
		</Provider>
	</GoogleOAuthProvider>
	, document.getElementById('root'));