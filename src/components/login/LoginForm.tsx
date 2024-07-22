import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IAuthorizationObject, ILoginForm, LoginFormSchema } from '../../types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { handleLoginRequest } from '../../api/authorization/authHandlers';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import AuthContext from '../../context/auth-context';

const LoginForm = () => {
  const { login } = useContext(AuthContext);

  const { mutate, isLoading } = useMutation<IAuthorizationObject, Error, ILoginForm>('login', handleLoginRequest, {
    onSuccess: (data) => login(data),
    onError: () => {
      toast.error('Login failed, please check your credentials');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmitHandler = (data: ILoginForm) => {
    if (isLoading) return;
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl id="email" isInvalid={!!errors.email}>
        <FormLabel>Email address</FormLabel>
        <Input {...register('email')} type="email" />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <Input {...register('password')} type="password" />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isDisabled={isLoading} colorScheme="teal">
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>
    </Stack>
  );
};

export default LoginForm;
