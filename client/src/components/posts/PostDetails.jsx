import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Loader from "../../utils/Loader";
import {
  deletePostAction,
  fetchPostAction,
} from "../../app/slices/posts/postsActions";
import AddComment from "../comments/AddComment";
import CommentsLists from "../comments/CommentsLists";

export default function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostAction(id));
  }, [dispatch, id]);

  const post = useSelector((state) => state?.post);

  const { postDetails, loading, appErr, serverErr, deletePost } = post;
  if (deletePost) {
    navigate("/posts");
  }

  //Get login user
  const user = useSelector((state) => state.users);
  const { userAuth } = user;

  const isCreatedBy = postDetails?.user?._id === userAuth?.id;

  return (
    <div className='post-details'>
      {loading ? (
        <Loader />
      ) : appErr || serverErr ? (
        <div>
          {serverErr}
          {appErr}
        </div>
      ) : (
        <>
          <img
            src={postDetails?.image}
            alt=''
            className='main-image img-fluid'
          />
          <div className='contents container'>
            <h5 className='title'>{postDetails?.title}</h5>
            <div className='author'>
              <Link to={`/profile/${postDetails?.user?.id}`}>
                <img
                  src={postDetails?.user?.profilePhoto}
                  alt=''
                  className='profile-image img-fluid'
                />
                <div className='user-info'>
                  <span className='h4'>{postDetails?.user?.firstName}</span>
                  <span className='mx-2 h4'>{postDetails?.user?.lastName}</span>
                </div>
              </Link>
              <p className='date'>
                {moment(postDetails?.createdAt).startOf().fromNow()}
              </p>
            </div>
            <div className='details'>
              <p className='desc'>{postDetails?.description}</p>
              {isCreatedBy && (
                <div className='icons'>
                  <button className='btn btn-info' disabled={!isCreatedBy}>
                    <Link to={`/update-post/${postDetails?._id}`}>
                      <i className='bi bi-pencil-square'></i>
                    </Link>
                  </button>
                  <button
                    disabled={!isCreatedBy}
                    className='btn btn-danger'
                    onClick={() =>
                      dispatch(deletePostAction(postDetails?._id))
                    }>
                    <i className='bi bi-trash'></i>
                  </button>
                </div>
              )}
            </div>
            <div className='comments'>
              {userAuth&&!userAuth.isBlocked && <AddComment postId={id} />}
              <CommentsLists comments={postDetails?.comments} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
