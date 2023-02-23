import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUserAction } from "../../../app/slices/users/usersActions";

export default function AdminNav() {
  const dispatch=useDispatch()
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
        <li>
          <NavLink to='/add-category'>Add Category</NavLink>
        </li>
        <li>
          <NavLink to='/category-list'>Category List</NavLink>
        </li>
      </ul>
      <div className='right'>
        <div className='right-menu'>
          <span>
            <i className='bi bi-box-arrow-in-left'></i>
          </span>
          <button onClick={() => dispatch(logoutUserAction())}>Logout</button>
        </div>
        <div className='right-menu'>
          <span>
            <i className='bi bi-plus-lg'></i>
          </span>
          <h6>New Post</h6>
        </div>
        <div className=''>
          <img src='/assets/avatar.jpg' alt='' className='avatar' />
        </div>
      </div>
    </div>
  );
}
