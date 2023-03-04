import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsAction,
  likePostAction,
  disLikePostAction,
} from "../../../app/slices/posts/postsActions";
import Loader from "../../../utils/Loader";
import { fetchCategories } from "../../../app/slices/category/CategoryAction";
import PostsCard from "./PostsCard";

export default function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post);
  const { postLists, appErr, serverErr, likes, disLikes } = posts;

  // filter useEffect
  useEffect(() => {
    dispatch(fetchPostsAction(""));
  }, [dispatch, likes, disLikes]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const category = useSelector((state) => state.category);
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;

  return (
    <div className='posts'>
      <div className='container'>
        <h5 className='posts-title'>Latest Posts From Users</h5>
        <p className='posts-desc'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam qui
          debitis at rem alias consequuntur perspiciatis placeat? Magni nisi
          iusto quos perferendis eligendi eos maiores, repellendus dolores
          reiciendis qui animi?
        </p>
        <div className='all d-flex justify-content-end'>
          <button
            className='btn btn-info mb-2'
            onClick={() => dispatch(fetchPostsAction(""))}>
            View All
          </button>
        </div>
        <div className='row'>
          <div className='col-3'>
            {catLoading ? (
              <Loader />
            ) : catAppErr || catServerErr ? (
              <h1>
                {catAppErr}
                {catServerErr}
              </h1>
            ) : categoryList?.length <= 0 ? (
              <h1 className='not-category'>no catergory found</h1>
            ) : (
              <div className='post-category'>
                <h5 className='title'>Category</h5>
                {categoryList?.map((category) => (
                  <div key={category?._id}>
                    <div
                      className='post-category-title'
                      onClick={() =>
                        dispatch(fetchPostsAction(category?.title))
                      }>
                      <p>{category?.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='col-9'>
            {appErr || serverErr ? (
              <h1>
                <span className='mx-2'>{serverErr}</span> {appErr}
              </h1>
            ) : postLists?.length > 0 ? (
              <div className='row'>
                {postLists?.map((post) => (
                  <div className='col-lg-4 mb-4' key={post._id}>
                    <PostsCard
                      post={post}
                      likePost={likePostAction}
                      disLikes={disLikePostAction}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <h1>There no post yet</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
