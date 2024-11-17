import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from "react-toastify";

interface Props {
  roles?: string[];
}

export const RequireAuth = ({ roles }: Props) => {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (roles && !roles?.some((r) => user.roles?.includes(r))) {
    toast.error("No tienes permisos para acceder a esta página");
    return <Navigate to="/catalog" />;
  }

  return <Outlet />;
};
