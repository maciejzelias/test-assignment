import { Alert, AlertIcon, AlertProps } from '@chakra-ui/react';

const ErrorAlert = (props: AlertProps) => {
  return (
    <Alert status="error" {...props}>
      <AlertIcon />
      There was an error processing your request, plese try again later.
    </Alert>
  );
};

export default ErrorAlert;
