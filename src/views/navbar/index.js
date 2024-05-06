import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authReducer";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="bg-blue-900 p-4 flex justify-between">
      <div className="flex">
        <Link to="/">
          <div className="text-white mr-5">Car</div>
        </Link>
        <Link to="/category">
          <div className="text-white">Category</div>
        </Link>
      </div>
      {/*  <Link to="/">
        <div className="text-white">Logout</div>
      </Link> */}

      <div className="text-white cursor-pointer" onClick={handleLogout}>
        Logout
      </div>
    </nav>
  );
}
