import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import useAuth from "../hooks/useAuth";

const GuestGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isValidated, validate } = useAuth();

  useEffect(() => {
    validate();
  }, []);

  if (isValidated && isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return children;
};

export default GuestGuard;
