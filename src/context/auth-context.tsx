import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { AuthorizationObjectSchema, IAuthorizationObject } from '../types/auth';
import instance from '../api/axios/axios';
import { safeJSONParse } from '../helpers';

type AuthContextProps = {
  accessToken?: IAuthorizationObject['accessToken'];
  email?: IAuthorizationObject['email'];
  isLoggedIn: boolean;
  login: (data: IAuthorizationObject) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AUTH_STORAGE = 'authorization';

const retrieveStoredAuthorization = (): IAuthorizationObject | null => {
  const storedAuthorization = localStorage.getItem(AUTH_STORAGE);
  if (!storedAuthorization) return null;

  const authorizationObject = safeJSONParse(storedAuthorization);
  const parsedAuthorization = AuthorizationObjectSchema.safeParse(authorizationObject);

  if (parsedAuthorization.success) {
    return parsedAuthorization.data;
  }

  // In case stored authorization is not parsed properly, remove it just in case
  localStorage.removeItem(AUTH_STORAGE);
  return null;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authorization, setAuthorization] = useState<IAuthorizationObject | null>(retrieveStoredAuthorization());

  useLayoutEffect(() => {
    if (!authorization?.accessToken) return;

    // Add authorization header to all axios requests
    const requestInterceptor = instance.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Bearer ${authorization.accessToken}`;
      return config;
    });

    // Handle logout on 401 response
    const responseInterceptor = instance.interceptors.response.use((response) => {
      if (response.status === 401) {
        logoutHandler();
      }
      return response;
    });

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [authorization]);

  const logoutHandler = () => {
    setAuthorization(null);
    localStorage.removeItem(AUTH_STORAGE);
  };

  const loginHandler = (data: IAuthorizationObject) => {
    setAuthorization(data);
    localStorage.setItem(AUTH_STORAGE, JSON.stringify(data));
  };

  const contextValue: AuthContextProps = {
    isLoggedIn: !!authorization,
    accessToken: authorization?.accessToken,
    email: authorization?.email,
    login: loginHandler,
    logout: logoutHandler,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
