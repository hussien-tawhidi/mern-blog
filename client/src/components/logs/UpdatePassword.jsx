import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  logoutUserAction,
  updatePasswordAction,
} from "../../app/slices/users/usersActions";

const formSchema = Yup.object({
  password: Yup.string().required("Passord is required"),
});
export default function UpdatePassword() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state?.users);

  const { changePasswordLoading, changePasswordAppErr, changePasswordServerErr } = userProfile;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: "",
      //   title: category?.title,
    },
    onSubmit: (values) => {
      dispatch(updatePasswordAction(values?.password));
      dispatch(logoutUserAction());
    },
    validationSchema: formSchema,
  });

  return (
    <div className='add-category'>
      <span className='h1'>
        <i className='bi bi-shield-lock'></i>
      </span>
      <h3 className='mb-3'>Update Password</h3>

      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          className='form-control mb-3 w-100'
          placeholder='Update Your Password'
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
        />

        {changePasswordAppErr || changePasswordServerErr ? (
          <div className='custome-alert-danger custome-alert-danger mx-4'>
            <div className='alert alert-danger' role='alert'>
              {changePasswordAppErr}
              {changePasswordServerErr}
            </div>
          </div>
        ) : null}
        {changePasswordLoading ? (
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
                formik.values.password === "" || formik.values.password===" "}>
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
