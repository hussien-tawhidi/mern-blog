import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormik } from "formik";
import { uploadProfilPhotoAction } from "../../../app/slices/users/usersActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const formSchema = Yup.object({
  image: Yup.string().required("Image is required"),
});

export default function UploadPhotos() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      image: "",
    },
    onSubmit: (values) => {
      const data = {
        image: values?.image,
      };
      dispatch(uploadProfilPhotoAction(data));
      console.log(data);
    },
    validationSchema: formSchema,
  });

  const uploadProfilePhoto = useSelector((state) => state?.users);
  const { loading, appErr, serverErr, profilePhoto, userAuth } =
    uploadProfilePhoto;
  if (profilePhoto) {
    navigate(`/profile/${userAuth?.id}`);
  }

  return (
    <div className='upload-profile-photo'>
      <div className='container'>
        <div className='content'>
          {appErr ||
            (serverErr && (
              <div className='custome-alert-danger custome-alert-danger mx-4'>
                <div className='alert alert-danger' role='alert'>
                  {appErr}
                  {serverErr}
                </div>
              </div>
            ))}
          <form onSubmit={formik.handleSubmit}>
            {formik?.touched?.image && (
              <div className='custome-alert-danger mx-4'>
                {formik?.errors?.image}
              </div>
            )}
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
                    <span className='mx-3'>
                      <i className='bi bi-images'></i>
                    </span>
                    <span className='title'>Choose profile</span>
                  </div>
                </div>
              )}
            </Dropzone>
            <p className='formate'>PNG,JPG,GIF minimum size 400kb</p>
            {loading ? (
              <button
                className='btn form-control btn-outline-secondary'
                disabled>
                <div
                  className='spinner-grow text-secondary'
                  role='status'></div>
              </button>
            ) : (
              <button
                className='btn form-control btn-outline-secondary'
                type='submit'>
                <span>
                  <i className='bi bi-cloud-arrow-up'></i>
                </span>
                <span>Upload Photo</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
