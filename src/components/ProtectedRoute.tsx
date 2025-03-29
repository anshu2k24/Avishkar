
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  ownerOnly?: boolean;
};

const ProtectedRoute = ({ children, ownerOnly = false }: ProtectedRouteProps) => {
  const { currentUser, isLoading, isOwner } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (ownerOnly && !isOwner) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
