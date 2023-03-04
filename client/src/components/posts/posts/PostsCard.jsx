import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function PostsCard({ post, likePost, disLikes }) {
  const dispatch = useDispatch();
    
  return (
    <div className='card single'>
      <img src={post?.image} className='card-img-top' alt='...' />
      <div className='card-body'>
        <h5 className='card-title text-capitalize'>{post.title}</h5>
        <p className='card-text'>
          {post.description}
          <Link to={`/post-details/${post._id}`} className='more'>
            Read More
          </Link>
        </p>
      </div>
      <div className='card-body reactions'>
        <span
          className='reactions-icon'
          onClick={() => dispatch(likePost(post?._id))}>
          <i className='bi bi-hand-thumbs-up'></i>
          <span>{post?.likes?.length}</span>
        </span>
        <span
          onClick={() => dispatch(disLikes(post?._id))}
          className='reactions-icon'>
          <i className='bi bi-hand-thumbs-down'></i>
          <span>{post?.disLikes?.length}</span>
        </span>
        <span className='reactions-icon'>
          <i className='bi bi-eye'></i>
          <span>{post?.numViews}</span>
        </span>
      </div>
      <div className='user'>
        <Link to={`/profile/${post?.user?._id}`}>
          <img
            src='/assets/avatar.jpg'
            alt=''
            className='img-fluid user-profile-img'
          />
          <div className='user-info'>
            <p className='user-full-name'>Full Name</p>
            <p className='data-full-name'>
              {post?.user?.firstName} {post?.user?.lastName}
            </p>
            <span className='date'>
              {" "}
              {moment(post.createdAt).startOf().fromNow()}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
