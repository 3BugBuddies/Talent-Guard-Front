import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export type UserRole = "ADMIN" | "RH_USER";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

interface UserTO {
  role: UserRole;
}

export default function PrivateRoute({
  children,
  requiredRole = "RH_USER",
}: PrivateRouteProps) {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  let user: UserTO | null = null;

  if (userString) {
    try {
      user = JSON.parse(userString) as UserTO;
    } catch (e) {
      console.error("Erro ao fazer parse do objeto de usuário", e);
      return <Navigate to="/login" replace />;
    }
  }

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== requiredRole) {
    console.warn(
      `Acesso negado. Role do usuário: ${user.role}, Role requerida: ${requiredRole}`
    );

    return <Navigate to="/" replace />;
  }

  return children;
}
