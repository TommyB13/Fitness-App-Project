import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createTheme, MantineProvider } from '@mantine/core';

import Routes from './routes';
import configureStore from './store';
import reportWebVitals from './reportWebVitals';

import { loadConfigFromLocalStorage } from 'utils/external';

import '@mantine/core/styles.css';
import 'styles/global.scss';

const store = configureStore({});
const theme = createTheme({
	/** Put your mantine theme override here */
});

loadConfigFromLocalStorage(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<MantineProvider theme={theme}>
		<Provider store={store}>
			<Routes />
		</Provider>
	</MantineProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
