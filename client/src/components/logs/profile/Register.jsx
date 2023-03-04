import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../app/slices/users/usersActions";

//Form schema
const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});
//-------------------------------
//Register
//-------------------------------
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  const { loading, appErr, serverErr, registered } = useSelector(
    (store) => store.users
  );

  if (registered) {
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
              <i className='bi bi-person-add'></i>
              <input
                id='first-name'
                type='text'
                name='first-name'
                placeholder='First Name '
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                required
              />
            </label>
            {formik.touched.firstName && (
              <div className='custome-alert-danger'>
                {formik.errors.firstName}
              </div>
            )}
          </div>
          <div className='form-field'>
            <label>
              <i className='bi bi-person-add'></i>
              <input
                id='last-name'
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
                type='text'
                name='last-name'
                placeholder='last Name '
              />
            </label>
            {formik.touched.lastName && (
              <div className='custome-alert-danger'>
                {formik.errors.lastName}
              </div>
            )}
          </div>
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
                required
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
            <button type='submit' className='button' disabled>
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
          <p>
            or have already account ? <Link to='/login'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
