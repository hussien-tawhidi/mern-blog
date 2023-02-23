import { Link, NavLink } from "react-router-dom";

export default function PublicNavbar() {
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
      </ul>
      <div className='right'>
        <div className='right-menu'>
          <span>
            <i className='bi bi-box-arrow-in-left'></i>
          </span>
          <Link to="/login">Login</Link>
        </div>
        <div className='right-menu'>
          <span>
            <i className='bi bi-plus-lg'></i>
          </span>
          <h6>New Post</h6>
        </div>
      </div>
    </div>
  );
}
