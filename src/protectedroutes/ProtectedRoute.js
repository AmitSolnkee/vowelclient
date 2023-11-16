import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    return navigate("/login");
  }

  return(children) ;
};

export default ProtectedRoutes;
