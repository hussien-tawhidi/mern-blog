import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  fetchSingleCategory,
  updateCategory,
  deleteCategory,
} from "../../app/slices/category/CategoryAction";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});
export default function UpdateCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navegate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleCategory(id));
  }, [id, dispatch]);

 

  const state = useSelector((state) => state?.category);

  const { loading, appErr, serverErr, category } = state;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category?.title,
    },
    onSubmit: (values) => {
      navegate("/category-list");
      dispatch(updateCategory({ title: values.title, id }));
    },
    validationSchema: formSchema,
  });

 const handleDelete = () => {
   dispatch(deleteCategory(id));
      navegate("/category-list");
   
 };

  return (
    <div className='add-category'>
      <img src='/logo.png' alt='logo' className='logo' />
      <h3>Update Category</h3>
      <p>These are the category that user will select when creating a post.</p>

      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          className='form-control mb-3 w-100'
          // placeholder='Update Category'
          value={formik.values.title}
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
        />
        {appErr || serverErr ? (
          <div className='custome-alert-danger custome-alert-danger mx-4'>
            <div className='alert alert-danger' role='alert'>
              {appErr}
              {serverErr}
            </div>
          </div>
        ) : null}
        {loading ? (
          <button className='btn btn-outline-dark add-cat' disabled>
            <span
              className='spinner-grow spinner-grow-sm'
              role='status'
              aria-hidden='true'></span>
            <span className='sr-only'>Loading...</span>
          </button>
        ) : (
          <>
            <button className='btn btn-outline-info add-cat mb-3' type='submit'>
              <span>
                <i className='bi bi-plus-lg'></i>
              </span>
              Update Category
            </button>
            <button
              className='btn btn-danger tab-menu add-cat'
              onClick={handleDelete}>
              <i className='bi bi-trash3'></i>
            </button>
          </>
        )}
      </form>
    </div>
  );
}
