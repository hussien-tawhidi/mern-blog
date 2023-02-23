import { useSelector } from "react-redux";
import AdminNav from "./admin/AdminNav";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./publicNav/PublicNavbar";

export default function Navbar() {
  const state = useSelector((state) => state.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  console.log(isAdmin);
  return (
    <div>
      {isAdmin ? <AdminNav /> : userAuth ? <PrivateNavbar /> : <PublicNavbar />}
    </div>
  );
}
