import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loader from "../../../utils/Loader";
import {
  sendEmailAction,
  userProfileAction,
} from "../../../app/slices/users/usersActions";

const formSchema = Yup.object({
  recipientEmail: Yup.string().required("Recipient Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});

export default function SendEmail() {
  const { id } = useParams();
  const param = useParams();
  const dispatch = useDispatch();
  const navegate = useNavigate();

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch]);

  const userProfile = useSelector((state) => state?.users);
  const { profile, loading, appErr, serverErr, userAuth, sendEmail } =
    userProfile;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      recipientEmail: profile?.email,
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
      dispatch(sendEmailAction(values));
    },
    validationSchema: formSchema,
  });

  // if (sendEmail) {
  //   navegate(`/profile/${userAuth?.id}`);
  // }
  return (
    <div className='update-profile'>
      {loading ? (
        <Loader />
      ) : (
        <div className='content'>
          <div className='w-50 mx-auto my-5'>
            <h5 className='title h1 mb-3'>Send Email</h5>
            <form onSubmit={formik.handleSubmit}>
              <label className='w-100 mb-3'>
                <input
                  disabled
                  type='text'
                  className='form-control'
                  value={formik.values.recipientEmail}
                  onChange={formik.handleChange("recipientEmail")}
                  onBlur={formik.handleBlur("recipientEmail")}
                />
                {formik?.touched?.recipientEmail && (
                  <div className='custome-alert-danger mx-4'>
                    {formik?.errors?.recipientEmail}
                  </div>
                )}
              </label>
              <label className='w-100 mb-3'>
                <input
                  type='text'
                  placeholder='Subject ...'
                  className='form-control'
                  value={formik.values.subject}
                  onChange={formik.handleChange("subject")}
                  onBlur={formik.handleBlur("subject")}
                />
                {formik?.touched?.subject && (
                  <div className='custome-alert-danger mx-4'>
                    {formik?.errors?.subject}
                  </div>
                )}
              </label>
              <label className='w-100 mb-3'>
                <textarea
                  type='text'
                  placeholder='Message...'
                  className='form-control'
                  value={formik.values.message}
                  onChange={formik.handleChange("message")}
                  onBlur={formik.handleBlur("message")}
                />
                {formik?.touched?.message && (
                  <div className='custome-alert-danger mx-4'>
                    {formik?.errors?.message}
                  </div>
                )}
              </label>
              <button className='btn btn-info form-control' type='submit'>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
