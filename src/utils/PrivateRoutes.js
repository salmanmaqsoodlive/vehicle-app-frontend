import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../views/navbar";

const PrivateRoutes = () => {
  const auth = useSelector((state) => state.authReducer.value);

  return auth.user && auth.token ? (
    <div className="flex flex-col w-screen">
      <Navbar /> <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoutes;
