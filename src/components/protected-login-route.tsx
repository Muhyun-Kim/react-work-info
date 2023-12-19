import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export const ProtectedLoginRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};
