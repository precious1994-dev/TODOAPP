'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#faf6f1',
      100: '#e6ccb2',
      500: '#7f4f24',
      600: '#6a4220',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'brand.500',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'brand.500',
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
} 