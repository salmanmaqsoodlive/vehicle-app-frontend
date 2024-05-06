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
    <nav className="bg-blue-900 py-4 flex justify-evenly">
      <Link to="/">
        <div className="text-white">Car</div>
      </Link>
      <Link to="/category">
        <div className="text-white">Category</div>
      </Link>
      {/*  <Link to="/">
        <div className="text-white">Logout</div>
      </Link> */}

      <div className="text-white cursor-pointer" onClick={handleLogout}>
        Logout
      </div>
    </nav>
  );
}
