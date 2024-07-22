import { Box, Heading } from '@chakra-ui/react';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
  return (
    <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center" bg="gray.100">
      <Box maxW="md" w="full" bg="white" boxShadow="lg" p={8} borderRadius="md">
        <Heading mb={6} textAlign="center" size="lg">
          Sign In
        </Heading>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
