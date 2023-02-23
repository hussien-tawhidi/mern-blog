import { createCategory } from "../../app/slices/category/CategoryAction";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
});
export default function AddCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      dispatch(createCategory(values));
      navigate("/category-list");

    },
    validationSchema: formSchema,
  });
  const state = useSelector((state) => state?.category);
  const { loading, appErr, serverErr } = state;
  return (
    <div className='add-category'>
      <img src='/logo.png' alt='logo' className='logo' />
      <h3>Add New Category</h3>
      <p>These are the category that user will select when creating a post.</p>

      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          className='form-control mb-3'
          placeholder='New Category'
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
          <button className='btn btn-outline-dark add-cat' type='submit'>
            <span>
              <i className='bi bi-plus-lg'></i>
            </span>
            Add new Category
          </button>
        )}
      </form>
    </div>
  );
}
