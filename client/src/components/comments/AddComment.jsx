import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../app/slices/comments/commentActions";

const formSchema = Yup.object({
  description: Yup.string().required("Comment is required"),
});

export default function AddComment({ postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    onSubmit: (values) => {
      const data = {
        postId,
        description: values?.description,
      };
      dispatch(createCommentAction(data));
    },
    validationSchema: formSchema,
  });
  const comment = useSelector((state) => state?.comment);
  const { createComment } = comment;

  if (createComment) {
    window.location.reload();
  }
  return (
    <div className='add-comment'>
      <form onSubmit={formik.handleSubmit}>
        <textarea
          type='text'
          placeholder='add your comment here ...'
          className='form-control mb-2'
          value={formik.values.description}
          onChange={formik.handleChange("description")}
          onBlur={formik.handleBlur("description")}
        />
        {formik?.touched?.description && (
          <div className='custome-alert-danger mx-4'>
            {formik?.errors?.description}
          </div>
        )}
        <button
          className='btn btn-info'
          type='submit'
          disabled={formik.values.description === ""}>
          Submit your comment
        </button>
      </form>
    </div>
  );
}
