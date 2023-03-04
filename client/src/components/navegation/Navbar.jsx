import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminNav from "./admin/AdminNav";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./publicNav/PublicNavbar";

export default function Navbar() {
  const state = useSelector((state) => state.users);
  const { userAuth, profile } = state;
  const isAdmin = userAuth?.isAdmin;

  return (
    <div>
      {isAdmin ? (
        <AdminNav isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      
    </div>
  );
}
