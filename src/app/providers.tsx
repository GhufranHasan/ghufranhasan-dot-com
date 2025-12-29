'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    background: '#0a0a0a',
    foreground: '#f8fafc',
    primary: {
      dark: '#270320',
      DEFAULT: '#310e3d',
      medium: '#560746',
      light: '#3a1152',
    },
    secondary: {
      DEFAULT: '#fd8303',
      light: '#fb8106',
    },
    card: 'rgba(49, 14, 61, 0.3)',
    border: 'rgba(86, 7, 70, 0.3)',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    body: 'var(--font-inter)',
    heading: 'var(--font-inter)',
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
