import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { userVerfiedAccountAction } from "../../../app/slices/users/usersActions";

export default function AccountVerified() {
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userVerfiedAccountAction(param?.id));
  }, [dispatch, param?.id]);
  const users = useSelector((state) => state.users);
  const { verifiedAppErr, verfiedServerErr, userAuth } = users;

  return (
    <div className='verfied-account'>
      <div className='container'>
        {verifiedAppErr || verfiedServerErr ? (
          <div className='alert'>
            <p>
              <span className='mx-3'>
                <i class='bi bi-exclamation-triangle'></i>
              </span>
              <span className='mx-1'>{verfiedServerErr}</span>{" "}
              <span>{verifiedAppErr}</span>
            </p>
          </div>
        ) : (
          <div className='content'>
            <h1>Congertulations</h1>
            <span>
              Your Account verfied successfully! use bellow link for your
              profile
            </span>
            <span className='mx-2'>
              <i class='bi bi-patch-check'></i>
            </span>
            <p className='my my-3'>
              <Link to={`/profile/${userAuth?.id}`}>Go to my profile</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
