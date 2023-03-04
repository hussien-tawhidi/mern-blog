import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import CategoryDropdown from "../../category/CategoryDropDown";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../../app/slices/posts/postsActions";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required("Image is required"),
});

export default function CreatePostsForm() {
  const dispatch = useDispatch();

  const post = useSelector((state) => state?.post);
  const { loading } = post;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
      const data = {
        category: values?.category,
        title: values?.title,
        description: values?.description,
        image: values?.image,
      };
      dispatch(createPostAction(data));
      console.log(data);
    },
    validationSchema: formSchema,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        <input
          type='text'
          id='title'
          placeholder='Title here ...'
          className='form-control'
          value={formik.values.title}
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
        />
        {formik?.touched?.title && (
          <div className='custome-alert-danger mx-4'>
            {formik?.errors?.title}
          </div>
        )}
      </label>
      <div className='category-select'>
        <label className='category-title'>Select a category</label>
        <CategoryDropdown
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
          id='description'
          className='form-control'
          placeholder='Descriptions ...'
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
        />
        {formik?.touched?.description && (
          <div className='custome-alert-danger mx-4'>
            {formik?.errors?.description}
          </div>
        )}
      </label>
      <div className='mb-2'>
        <label>
          <Dropzone
            onBlur={formik.handleBlur("image")}
            acceptedFiles='.png, .jpg'
            onDrop={(acceptedFiles) => {
              formik.setFieldValue("image", acceptedFiles[0]);
            }}>
            {({ getRootProps, getInputProps }) => (
              <div>
                <div
                  {...getRootProps({
                    className: "dropzone",
                    onDrop: (event) => event.stopPropagation(),
                  })}>
                  <input {...getInputProps()} />
                  <button className='d-flex create-post-select-image btn btn-light'>
                    <p>image</p>
                    <span className='mx-2'>
                      <i class='bi bi-images'></i>
                    </span>
                  </button>
                </div>
              </div>
            )}
          </Dropzone>
          {formik?.touched?.image && (
            <div className='custome-alert-danger mx-4'>
              {formik?.errors?.image}
            </div>
          )}
        </label>
      </div>
      {loading ? (
        <button className='btn btn-outline-dark add-cat' disabled>
          <div className='spinner-grow text-secondary' role='status'></div>
        </button>
      ) : (
        <button className='btn btn-light add-cat' type='submit'>
          Create post
        </button>
      )}
    </form>
  );
}
