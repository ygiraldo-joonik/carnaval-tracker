import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import useAuth from "../hooks/useAuth";

const AuthGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isValidated, validate } = useAuth();

  useEffect(() => {
    validate();
  }, []);

  if (isValidated && !isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return children;
};

export default AuthGuard;
