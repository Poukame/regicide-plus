// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

const fonts = {
	fonts: {
		body: `Vecna, sans-serif`,
		heading: 'Vecna, sans-serif'
	},
};

const breakpoints = {
	sm: '38em'
}

const body = {
	styles: {
	  global: {
		'html, body': {
			minHeight:'100vh',
			padding:'1',
			letterSpacing: '2px',
			bgGradient:'linear(to-t, hsl(209deg 15% 42%) 0%, hsl(207deg 16% 43%) 19%,hsl(205deg 16% 44%) 30%,hsl(202deg 16% 45%) 39%,hsl(200deg 15% 45%) 46%, hsl(198deg 15% 46%) 53%,hsl(194deg 16% 48%) 59%,hsl(189deg 16% 49%) 66%,hsl(183deg 15% 50%) 72%,hsl(177deg 16% 52%) 80%,hsl(169deg 17% 54%) 100%)'
		},
		'button': {
		  letterSpacing:'3px',
		  boxShadow:'2px 2px 5px 0px #cadad8'
		}
	  },
	},
  }


// // 3. extend the theme
const theme = extendTheme({ config, breakpoints }, fonts, body);

export default theme;