import { Button, Flex, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

const Navbar = () => {
  const { email, logout } = useContext(AuthContext);

  return (
    <Flex
      as="header"
      bg="teal.500"
      px={4}
      h={16}
      alignItems="center"
      gap={3}
      position="sticky"
      top={0}
      zIndex={10}
      w="100%">
      <Flex gap={3} ms="auto" alignItems="center">
        <Text fontSize="small" color="white">
          {email}
        </Text>
        <Button size="sm" onClick={logout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
