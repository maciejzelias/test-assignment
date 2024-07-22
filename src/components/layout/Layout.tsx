import { Box, Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Box flexGrow={1} display="flex" flexDirection="column" bg="gray.50">
      <Navbar />
      <Flex flexGrow={1} flexDirection="column">
        {children}
      </Flex>
    </Box>
  );
};

export default Layout;
