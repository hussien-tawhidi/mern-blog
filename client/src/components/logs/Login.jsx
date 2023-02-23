import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUserAction } from "../../app/slices/users/usersActions";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  const { loading, appErr, serverErr, userAuth } = useSelector((store) => store?.users);

  if (userAuth) {
    navigate("/profile");
  }

  return (
    <div className='register'>
      <div className='login'>
        <form className='form' onSubmit={formik.handleSubmit}>
          <h2>Register Account</h2>
          {appErr || serverErr ? (
            <div className='custome-alert-danger custome-alert-danger mx-4'>
              <div className='alert alert-danger' role='alert'>
                {appErr}
                {serverErr}
              </div>
            </div>
          ) : null}
          <div className='form-field'>
            <label>
              <i className='bi bi-envelope-at'></i>
              <input
                id='email'
                type='email'
                name='email'
                placeholder='email '
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
            </label>
            {formik.touched.email && (
              <div className='custome-alert-danger'>{formik.errors.email}</div>
            )}
          </div>
          <div className='form-field'>
            <label>
              <i className='bi bi-shield-lock'></i>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='Password'
                pattern='.{6,}'
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                required
              />
            </label>
            {formik.touched.password && (
              <div className='custome-alert-danger'>
                {formik.errors.password}
              </div>
            )}
          </div>
          {loading ? (
            <button type='submit' className='button'>
              <span
                className='spinner-grow spinner-grow-sm'
                role='status'
                aria-hidden='true'></span>
              <span className='sr-only'>Loading...</span>
            </button>
          ) : (
            <button type='submit' className='button'>
              <div className='arrow-wrapper'>
                <span className='arrow'></span>
              </div>
              <p className='button-text'>Create Account</p>
            </button>
          )}
        </form>
        <div className='more-content'>
          <Link to='/'>forgot password</Link>
          <p>
            or don't have account ? <Link to='/register'>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
