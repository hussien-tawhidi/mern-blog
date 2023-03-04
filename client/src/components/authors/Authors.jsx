import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader";
import {
  blockUserAction,
  fetchAllUsersAction,
  unBlockUserAction,
} from "../../app/slices/users/usersActions";
import AuthorsHeader from "./AuthorsHeader";
import AuthorsProfile from "./AuthorsProfile";
import AuthosStatus from "./AuthosStatus";
export default function Authors() {
  const dispatch = useDispatch();

  const fetchAllUsers = useSelector((state) => state?.users);
  const { userAuth } = fetchAllUsers;

  const {
    allUsers,
    fetchAllUsersLoading,
    allUsersAppErr,
    allUsersServerErr,
    unBlock,
    block,
  } = fetchAllUsers;

  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [dispatch, block, unBlock]);

  console.log(userAuth?.isAdmin);

  return (
    <div className='category-list'>
      <div className='user-header'>
        <img src='/assets/users-bg.jpg' alt='' />
        <div className='texts'>
          <h3>All the user should list bellow lists</h3>
          <p>
            You could see all our user in the bellow list if you want to
            contact, follow, or see the idea of them
          </p>
        </div>
      </div>
      {fetchAllUsersLoading ? (
        <Loader />
      ) : allUsersAppErr || allUsersServerErr ? (
        <h2>
          {allUsersServerErr}
          {allUsersAppErr}
        </h2>
      ) : allUsers?.length <= 0 ? (
        <>
          <h2>no category found</h2>
        </>
      ) : (
        <>
          {allUsers?.map((cat) => (
            <div className='single-category-list' key={cat._id}>
              <div className='container'>
                <table className='table'>
                  <thead>
                    <tr>
                      <AuthorsHeader />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <div className='row'>
                        <div className='col-4'>
                          <AuthorsProfile cat={cat} />
                        </div>
                        <div className='col-2'>
                          <td className='h-100 d-flex align-items-center tab-menu'>
                            {cat?.accountType}
                          </td>
                        </div>
                        <div className='col-2'>
                          <td className='h-100 d-flex align-items-center tab-menu'>
                            {moment(cat.createdAt).startOf().fromNow()}
                          </td>
                        </div>
                        <div className='col-2'>
                          <div className='d-flex justify-content-center align-items-center'>
                            {cat?.followers?.length}
                          </div>
                        </div>
                        <div className='col-2'>
                          <AuthosStatus
                            cat={cat}
                            userAuth={userAuth}
                            blockUser={blockUserAction}
                            unBlockUser={unBlockUserAction}
                          />
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
