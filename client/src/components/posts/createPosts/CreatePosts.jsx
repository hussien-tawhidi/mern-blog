import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import CreatePostsForm from "./CreatePostsForm";



export default function CreatePosts() {
  const navigate = useNavigate();

  const post = useSelector((state) => state?.post);
  const { appErr, serverErr, isCreated } = post;


  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  if (isCreated) return navigate("/posts");

  return (
    <div className='create-post'>
      <div className='create-post-content'>
        <h5 className='title'>Create Post</h5>
        <p className='desc'>
          Share your ideas to the word. Your post must be free from profanity
        </p>
        {appErr || serverErr ? (
          <div className='custome-alert-danger custome-alert-danger mx-4'>
            <div className='alert alert-danger' role='alert'>
              <span className='mx-2'>{serverErr}</span>
              {appErr}
            </div>
          </div>
        ) : null}
        {userAuth?.isBlocked ? (
          <div className='custome-alert-danger custome-alert-danger mx-4'>
            <div className='alert alert-danger' role='alert'>
              Your blocked please contact us ...
            </div>
          </div>
        ) : (
          <CreatePostsForm/>
        )}
      </div>
    </div>
  );
}
