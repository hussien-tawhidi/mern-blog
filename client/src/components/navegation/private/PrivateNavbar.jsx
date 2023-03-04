import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../../app/slices/users/usersActions";

export default function PrivateNavbar({isLogin}) {
  const [profile, setProfile] = useState(false)
const navigate=useNavigate()

const showProfile = () => {
  setProfile(!profile);
};

  const handleLogout = () => {
    dispatch(logoutUserAction())
navigate("/login")
  }
  
  const dispatch = useDispatch()
  return (
    <div className='public-nav'>
      <ul>
        <Link to='/'>
          <img src='/logo.png' alt='' className='logo' />
        </Link>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/create-post'>Create</NavLink>
        </li>
        <li>
          <NavLink to='/posts'>Posts</NavLink>
        </li>
        <li>
          <NavLink to='/users'>Authors</NavLink>
        </li>
      </ul>
      <div className='right'>
        <div className='right-menu'>
          <span>
            <i className='bi bi-box-arrow-in-left'></i>
          </span>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='right-menu'>
          <span>
            <i className='bi bi-plus-lg'></i>
          </span>
          <h6>New Post</h6>
        </div>
        <div className='user-profile'>
          <img
            src={isLogin?.profilePhoto}
            alt=''
            className='avatar'
            onClick={showProfile}
          />
          <div className={profile ? "profile-menu show" : "profile-menu"}>
            <Link
              to={`/profile/${isLogin?.id}`}
              className='menu'
              onClick={showProfile}>
              <p>profile</p>
            </Link>
            <p>
              <Link
                to='/update-password'
                className='change-password'
                onClick={showProfile}>
                change password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
