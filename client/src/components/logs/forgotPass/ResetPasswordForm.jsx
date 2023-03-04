import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { passwordResetTokenAction } from "../../../app/slices/users/usersActions";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
});
export default function ResetPasswordForm() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state?.users);

  const {
    passwordResetTokenLoading,
    passwordResetTokenLoadingAppErr,
    passwordResetTokenLoadingServerErr,
  } = userProfile;

  console.log(userProfile?.passwordResetToken?.msg);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      //   title: category?.title,
    },
    onSubmit: (values) => {
      dispatch(passwordResetTokenAction(values?.email));
    },
    validationSchema: formSchema,
  });

  return (
    <div className='add-category'>
      <span className='h1'>
        <i className='bi bi-shield-lock'></i>
      </span>
      <h3 className='mb-3'>Enter Your Email</h3>
      {userProfile?.passwordResetToken && (
        <div className='alert alert-success'>
          {userProfile?.passwordResetToken?.msg}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <input
          type='email'
          className='form-control mb-3 w-100'
          placeholder='Enter Your Email'
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
        />

        {passwordResetTokenLoadingAppErr ||
        passwordResetTokenLoadingServerErr ? (
          <div className='custome-alert-danger custome-alert-danger mx-4'>
            <div className='alert alert-danger' role='alert'>
              <span className='mx-2'>{passwordResetTokenLoadingServerErr}</span>
              {passwordResetTokenLoadingAppErr}
            </div>
          </div>
        ) : null}
        {passwordResetTokenLoading ? (
          <button className='btn btn-outline-dark add-cat' disabled>
            <span
              className='spinner-grow spinner-grow-sm'
              role='status'
              aria-hidden='true'></span>
            <span className='sr-only'>Loading...</span>
          </button>
        ) : (
          <>
            <button
              className='btn btn-outline-info add-cat mb-3'
              type='submit'
              disabled={
                formik.values.email === "" || formik.values.email === " "
              }>
              <span>
                <i className='bi bi-plus-lg'></i>
              </span>
              Confirm ...
            </button>
          </>
        )}
      </form>
    </div>
  );
}
