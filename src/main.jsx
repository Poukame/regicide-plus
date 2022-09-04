import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from './OptionsContext';
import theme from './theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ContextProvider>
				<App />
			</ContextProvider>
		</ChakraProvider>
	</React.StrictMode>
);
