import { useEffect, useState } from "react";
import moment from "moment";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUserAction,
  followUserAction,
  sendEmailToVerfiedAccountAction,
  unBlockUserAction,
  unFollowUserAction,
  userProfileAction,
} from "../../../app/slices/users/usersActions";
export default function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);

  const users = useSelector((state) => state?.users);
  const {
    profile,
    appErr,
    serverErr,
    verificationLoading,
    followed,
    unFollowed,
    sendEmailToVerifiedAppError,
    sendEmailToVerifiedServerError,
    userAuth,
  } = users;

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, followed, unFollowed]);

  const sendEmailToVerified = () => {
    setAlert(!alert);
    dispatch(sendEmailToVerfiedAccountAction());
  };

  const isLoginUser = userAuth?.id === profile?._id;

  console.log(profile?.isBlocked);

  return (
    <div className='profile'>
      {profile?.isBlocked && (
        <div className='alert alert-danger'>
          <p>
            <span className='mx-3'>
              <i class='bi bi-exclamation-triangle'></i>
            </span>
            your have blocked because of harmfull contents
          </p>
        </div>
      )}
      {!profile?.isAccountVerified && (
        <>
          <div className='account-verified'>
            Your account is not verified for verify your account !{" "}
            <span onClick={sendEmailToVerified}>Click here</span>
          </div>
          {verificationLoading ? (
            <div className='d-flex justify-content-center w-50'>
              <div className='spinner-grow text-dark' role='status'></div>
            </div>
          ) : sendEmailToVerifiedAppError || sendEmailToVerifiedServerError ? (
            <div className='alert'>
              <p>
                <span className='mx-3'>
                  <i class='bi bi-exclamation-triangle'></i>
                </span>
                <span className='mx-1'>{sendEmailToVerifiedAppError}</span>{" "}
                <span>{sendEmailToVerifiedAppError}</span>
              </p>
            </div>
          ) : (
            <div
              className={!alert ? "d-none" : "d-flex account-verified-success"}>
              <span className='mx-2'>
                <i className='bi bi-check-lg'></i>
              </span>
              Token has sent to your email !<span>Check your email</span>
            </div>
          )}
        </>
      )}
      {appErr || serverErr ? (
        <div className='custome-alert-danger custome-alert-danger mx-4'>
          <div className='alert alert-danger' role='alert'>
            {appErr}
            {serverErr}
          </div>
        </div>
      ) : (
        <div className='container '>
          <img src={profile?.profilePhoto} alt='' className='cover img-fluid' />
          <div className='profile-content '>
            <div className='profile-details'>
              <img
                src={profile?.profilePhoto}
                alt={profile?.firstName}
                className='profile-img img-fluid'
              />
              <div className='user-name'>
                <p className='title'>User Name:</p>
                <p className='user'>
                  {profile?.firstName} {profile?.lastName}
                </p>
                <div className='user-followers'>
                  <p>
                    <span>Posts : </span>
                    <span>{profile?.posts?.length}</span>
                  </p>

                  <p>
                    <span>Followers : </span>

                    <span>{profile?.followers.length}</span>
                  </p>
                  <p>
                    <span>Following : </span>
                    <span>{profile?.following.length}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='user-info'>
              {isLoginUser &&
                (!profile?.isAccountVerified ? (
                  <button className='btn btn-danger position-relative mb-2'>
                    Unverfied Account
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                      {profile?.accountType}
                      <span className='visually-hidden'>unread messages</span>
                    </span>
                  </button>
                ) : (
                  <button className='btn btn-success position-relative mb-2'>
                    Account Verified
                    <span className='position-absolute top-0 start-100 translate-middle rounded-pill badge text-bg-secondary'>
                      {profile?.accountType}
                      <span className='visually-hidden'>unread messages</span>
                    </span>
                  </button>
                ))}

              <div className='date-joined'>
                <p className='h4'>Date Joined:</p>
                <p>{moment(profile?.createdAt).format("MMMM Do YYYY")}</p>
              </div>
              <div className='date-joined'>
                <span>
                  <i className='bi bi-eye'></i>
                </span>
                <span>({profile?.viewedBy?.length}) viewed</span>
                {profile?.viewedBy?.length > 0 &&
                  profile?.viewedBy?.map((view) => (
                    <div
                      className='profile-details viewed shadow p-2 d-flex justify-content-between w-100 position-relative '
                      key={view?.id}>
                      <Link
                        to={`/profile/${view?.id}`}
                        className='d-flex justify-content-between w-100 '>
                        <img
                          src={view?.profilePhoto}
                          alt={"some txt"}
                          className='profile-img img-fluid position-relative '
                        />
                        <button className='btn position-relative mb-2'>
                          <p className='user'>{view?.firstName}</p>
                          <span className='position-absolute top-0 start-100 translate-middle rounded-pill badge text-bg-secondary'>
                            <p>{view?.accountType}</p>
                            <span className='visually-hidden'>
                              unread messages
                            </span>
                          </span>
                        </button>
                      </Link>
                    </div>
                  ))}
              </div>
              {isLoginUser && (
                <button
                  className='btn btn-outline-secondary'
                  disabled={userAuth?.isBlocked}>
                  <Link to={"/upload-profile-photo"}>
                    {" "}
                    <span>
                      <i className='bi bi-cloud-arrow-up'></i>
                    </span>
                    <span>Upload Photo</span>
                  </Link>
                </button>
              )}
            </div>
            <div className='buttons mt-2'>
              {!isLoginUser && !userAuth?.isBlocked && (
                <div className='single-buttons'>
                  {!profile?.isBlocked ? (
                    <button
                      className='btn  btn-outline-danger'
                      onClick={() => dispatch(blockUserAction(profile?.id))}>
                      <span className='icon'>
                        <i class='bi bi-x-circle-fill'></i>
                      </span>
                      <span>Block</span>
                    </button>
                  ) : (
                    <button
                      className='btn  btn-outline-secondary'
                      onClick={() => dispatch(unBlockUserAction(profile?.id))}>
                      <span className='icon'>
                        <i class='bi bi-x-circle-fill'></i>
                      </span>
                      <span>unBlock</span>
                    </button>
                  )}
                </div>
              )}
              {!isLoginUser && (
                <div className='single-buttons'>
                  {profile?.isFollowing ? (
                    <button
                      className='btn  btn-outline-secondary'
                      onClick={() => dispatch(unFollowUserAction(id))}>
                      <span className='icon'>
                        <i className='bi bi-emoji-neutral'></i>
                      </span>
                      <span>Unfollow</span>
                    </button>
                  ) : (
                    <button
                      className='btn  btn-outline-secondary'
                      onClick={() => {
                        dispatch(followUserAction(id));
                      }}>
                      <span className='icon'>
                        <i className='bi bi-heart'></i>
                      </span>
                      <span>Follow</span>
                    </button>
                  )}
                </div>
              )}
              {isLoginUser && (
                <div className='single-buttons'>
                  <button
                    className='btn  btn-outline-secondary'
                    disabled={userAuth?.isBlocked}>
                    <Link to='/update-profile'>
                      <span className='icon'>
                        <i className='bi bi-person'></i>
                      </span>
                      <span>Update Profile</span>
                    </Link>
                  </button>
                </div>
              )}
              {!isLoginUser && (
                <div className='single-buttons'>
                  <Link to={`/send-email/${profile?.id}`}>
                    <button className='btn  btn-outline-secondary'>
                      <span className='icon'>
                        <i className='bi bi-envelope'></i>
                      </span>
                      <span>Send Message</span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className='user-posts'>
            <h3 className='post-title'>
              <span className='post-counter'>
                <span>
                  <i className='bi bi-sticky'></i>
                </span>
              </span>
              My Posts
            </h3>
            {profile?.posts?.length <= 0 ? (
              <h2>
                Posts are not found <Link to='/create-post'>Create new</Link>{" "}
              </h2>
            ) : (
              profile?.posts.map((post) => (
                <div className='col-lg-4 mb-4' key={post?._id}>
                  <div className='card single'>
                    <img src={post?.image} className='card-img-top' alt='...' />
                    <div className='card-body'>
                      <h5 className='card-title text-capitalize'>
                        {post?.title}
                      </h5>
                      <p className='card-text'>
                        {post?.description}
                        <Link
                          to={`/post-details/${post?._id}`}
                          className='more'>
                          Read More
                        </Link>
                      </p>
                    </div>
                    <div className='card-body reactions'>
                      <span className='reactions-icon'>
                        <i className='bi bi-hand-thumbs-up'></i>
                        <span>{post?.likes?.length}</span>
                      </span>
                      <span className='reactions-icon'>
                        <i className='bi bi-hand-thumbs-down'></i>
                        <span>{post?.disLikes?.length}</span>
                      </span>
                      <span className='reactions-icon'>
                        <i className='bi bi-eye'></i>
                        <span>{post?.numViews}</span>
                      </span>
                    </div>
                    <div className='card-footer'>
                      <span className='mx-2'>
                        <i className='bi bi-stopwatch'></i>
                      </span>
                      <span>{moment(post.createdAt).startOf().fromNow()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
