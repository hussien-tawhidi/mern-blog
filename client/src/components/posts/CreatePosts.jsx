import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import CategoryDropdown from "../category/CategoryDropDown";

import { createPostAction } from "../../app/slices/posts/postsActions";
import { useSelector } from "react-redux";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required("Image is required"),
});

export default function CreatePosts() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const post = useSelector((state) => state?.post);
  const { loading, appErr, serverErr, isCreated } = post;

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
  // console.log(formik?.values?.category?.label);

  if (isCreated) return navigate("/");

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
              {appErr}
              {serverErr}
            </div>
          </div>
        ) : null}
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
                  <div className='container'>
                    <div
                      {...getRootProps({
                        className: "dropzone",
                        onDrop: (event) => event.stopPropagation(),
                      })}>
                      <input {...getInputProps()} />
                      <p className='text-gray-300 text-lg cursor-pointer hover:text-gray-500'>
                        Click here to select image
                      </p>
                    </div>
                  </div>
                )}
              </Dropzone>
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
      </div>
    </div>
  );
}
