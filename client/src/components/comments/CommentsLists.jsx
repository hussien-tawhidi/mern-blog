import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletCommentAction } from "../../app/slices/comments/commentActions";

export default function CommentsLists({
  comments,
  appErr,
  serverErr,
 
}) {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state?.comment);
  const { deletedComment } = comment;

  const user = useSelector((state) => state?.users);
  
  const { userAuth } = user;


  if (deletedComment) {
    window.location.reload();
  }

  return (
    <div className='comment-lists'>
      <div className='container'>
        {appErr || serverErr ? (
          <h1>Error</h1>
        ) : (
          <>
            <h5>{comments?.length} Total Comments</h5>
            <div className=''>
              {comments?.length <= 0 ? (
                <h1>No comment attached yet ...</h1>
              ) : (
                comments?.map((comment) => (
                  <div className='single-comment' key={comment?._id}>
                    <Link to={`/profile/${comment?.user?._id}`}>
                      <div className='profile'>
                        <div className='profile-content'>
                          <img src='/assets/avatar.jpg' alt='' />
                          <p>{comment?.user?.firstName}</p>
                        </div>
                        <div className='date'>
                          <span>
                            <i className='bi bi-clock'></i>
                          </span>
                          <span className='mx-2'>
                            {moment(comment?.createdAt).startOf().fromNow()}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <p>{comment?.description}</p>
                    {userAuth?.id === comment?.user?._id && (
                      <>
                        <button className='btn btn-info'>
                          <Link to={`/update-comment/${comment?._id}`}>
                            <i className='bi bi-pencil-square'></i>
                          </Link>
                        </button>
                        <button
                          className='btn btn-danger mx-3'
                          onClick={() =>
                            dispatch(deletCommentAction(comment?._id))
                          }>
                          <i className='bi bi-trash'></i>
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
