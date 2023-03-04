import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { passwordResetAction } from "../../../app/slices/users/usersActions";
import { useEffect } from "react";

const formSchema = Yup.object({
  password: Yup.string().required("Passord is required"),
});
export default function ResetPassword() {
  const navigate = useNavigate();
  const param = useParams();
  const token = param?.id;
  console.log(token);
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state?.users);

  const {
    resetPassLoading,
    passwordResetAppErr,
    passwordResetServerErr,
    isReseted,
  } = userProfile;

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      //dispath the action
      const data = {
        password: values?.password,
        token,
      };
      dispatch(passwordResetAction(data));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (isReseted) navigate("/login");
  }, [isReseted, navigate]);

  return (
    <div className='add-category'>
      <span className='h1'>
        <i className='bi bi-shield-lock'></i>
      </span>
      <h3 className='mb-3'>Enter Your New Password</h3>

      <form onSubmit={formik.handleSubmit}>
        <input
          type='password'
          className='form-control mb-3 w-100'
          placeholder='Your New Password'
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
        />
        <div className='text-red-400 mb-2'>
          {formik.touched.password && formik.errors.password}
        </div>
        {passwordResetAppErr || passwordResetServerErr ? (
          <div className='custome-alert-danger custome-alert-danger mx-4'>
            <div className='alert alert-danger' role='alert'>
              <span className='mx-2'>{passwordResetServerErr}</span>
              {passwordResetAppErr}
            </div>
          </div>
        ) : null}
        {resetPassLoading ? (
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
                formik.values.password === "" || formik.values.password === " "
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
