import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());

    history.push("/home");
  };

  return (
    <button onClick={handleLogout} className="logout btn btn-danger">
      Logout
    </button>
  );
};
export default Logout;
