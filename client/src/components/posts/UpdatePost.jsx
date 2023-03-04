import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  fetchPostAction,
  updatePostAction,
} from "../../app/slices/posts/postsActions";
import CategoryDropDown from "../category/CategoryDropDown";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
});

export default function UpdatePost() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navegate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostAction(id));
  }, [id, dispatch]);

  const postData = useSelector((state) => state.post);
  const { postDetails } = postData;

  const postUpdate = useSelector((state) => state.post);
  const { loading, appErr, serverErr, isUpdated } = postUpdate;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postDetails?.title,
      description: postDetails?.description,
      category: "",
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        id,
      };
      dispatch(updatePostAction(data));
      console.log(data);
    },
    validationSchema: formSchema,
  });

  if (isUpdated) {
    navegate("/posts");
  }

  return (
    <div className='update-post'>
      <div className='content'>
        <h3 className='title'>update post</h3>
        {appErr ||
          (serverErr && (
            <div className='alert alert-success' role='alert'>
              done
            </div>
          ))}
        <form onSubmit={formik.handleSubmit}>
          <label>
            <input
              type='text'
              id='title'
              name='title'
              placeholder='title'
              className='form-control'
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
              onChange={formik.handleChange("title")}
            />
            {formik?.touched?.title && (
              <div className='custome-alert-danger mx-4'>
                {formik?.errors?.title}
              </div>
            )}
          </label>
          <div className='category-select mb-3'>
            <label className='category-title'>Select a category</label>
            <CategoryDropDown
              value={formik.values.category?.label}
              onChange={formik.setFieldValue}
              onBlur={formik.setFieldTouched}
              error={formik.errors.category}
              touched={formik.touched.category}
            />
          </div>
          <label>
            <textarea
              type='text'
              className='form-control'
              placeholder='description'
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
              onChange={formik.handleChange("description")}
            />
            {formik?.touched?.description && (
              <div className='custome-alert-danger mx-4'>
                {formik?.errors?.description}
              </div>
            )}
          </label>
          {loading ? (
            <button className='btn btn-outline-dark add-cat' disabled>
              <span
                className='spinner-grow spinner-grow-sm'
                role='status'
                aria-hidden='true'></span>
              <span className='sr-only'>Loading...</span>
            </button>
          ) : (
            <button className='btn btn-info add-cat' type='submit'>
              Update ...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
