import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "../../../utils/Loader";
import {
  updateProfileAction,
  userProfileAction,
} from "../../../app/slices/users/usersActions";

const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  bio: Yup.string().required("Bio is required"),
});

export default function UpdateProfile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navegate = useNavigate();

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch]);

  const userProfile = useSelector((state) => state?.users);
  const { profile, loading, userAuth } = userProfile;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      email: profile?.email,
      bio: profile?.bio,
    },
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
      navegate(`/profile/${userAuth?.id}`);
    },
    validationSchema: formSchema,
  });

  console.log(userAuth?.id);

  return (
    <div className='update-profile'>
      {loading ? (
        <Loader />
      ) : (
        <div className='content'>
          <div className='w-50 mx-auto my-5'>
            <h5 className='title h1 mb-3'>Update your profile</h5>
            <form onSubmit={formik.handleSubmit}>
              <label className='w-100 mb-3'>
                <input
                  type='text'
                  placeholder='First name ...'
                  className='form-control'
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                />
                {formik?.touched?.firstName && (
                  <div className='custome-alert-danger mx-4'>
                    {formik?.errors?.firstName}
                  </div>
                )}
              </label>
              <label className='w-100 mb-3'>
                <input
                  type='text'
                  placeholder='Last name ...'
                  className='form-control'
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                />
                {formik?.touched?.lastName && (
                  <div className='custome-alert-danger mx-4'>
                    {formik?.errors?.lastName}
                  </div>
                )}
              </label>
              <label className='w-100 mb-3'>
                <input
                  type='text'
                  placeholder='Email...'
                  className='form-control'
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                {formik?.touched?.email && (
                  <div className='custome-alert-danger mx-4'>
                    {formik?.errors?.email}
                  </div>
                )}
              </label>
              <label className='w-100 mb-3'>
                <textarea
                  type='text'
                  placeholder='Bio...'
                  className='form-control'
                  value={formik.values.bio}
                  onChange={formik.handleChange("bio")}
                  onBlur={formik.handleBlur("bio")}
                />
                {formik?.touched?.bio && (
                  <div className='custome-alert-danger mx-4'>
                    {formik?.errors?.bio}
                  </div>
                )}
              </label>
              <button className='btn btn-info form-control' type='submit'>
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
