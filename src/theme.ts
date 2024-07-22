import { extendTheme } from '@chakra-ui/react';

// example theme
const theme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        colorScheme: 'teal',
      },
    },
  },
});

export default theme;
