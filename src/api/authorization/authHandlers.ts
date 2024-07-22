import { AuthorizationObjectSchema, ILoginForm } from '../../types/auth';
import axios from '../axios/axios';

export const handleLoginRequest = async (inputData: ILoginForm) => {
  const { data } = await axios.post('/login', inputData);
  return AuthorizationObjectSchema.parse(data);
};
