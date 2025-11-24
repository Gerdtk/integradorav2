import { Route, Redirect } from "react-router-dom";
import { IonLoading } from "@ionic/react";
import { useAuth } from "../context/AuthContext";

interface GuardProps {
  component: React.ComponentType<Record<string, unknown>>;
  path: string;
  exact?: boolean;
}

const ReverseAuthGuard: React.FC<GuardProps> = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) return <IonLoading isOpen message="Verificando sesión..." />;

  if (user) return <Redirect to="/Home" />;

  return <Route {...rest} render={(p) => <Component {...p} />} />;
};

export default ReverseAuthGuard;
