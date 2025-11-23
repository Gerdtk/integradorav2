import React, { useEffect, useState } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { IonLoading } from "@ionic/react";
import { auth } from "../lib/firebase";

interface AuthGuardProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ component: Component, ...rest }) => {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true); // <-- NUEVO

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Esperamos a que Firebase termine de revisar
      setUser(firebaseUser ?? null);
      setChecking(false);
      console.log("AuthGuard - Usuario actual:", firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // 🔄 Mientras verifica la sesión
  if (checking) {
    return <IonLoading isOpen message="Verificando sesión..." />;
  }

  // 🔒 Si no hay usuario, manda a Ingreso
  if (!user) {
    return <Redirect to="/Ingreso" />;
  }

  // ✅ Si hay usuario autenticado
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default AuthGuard;
