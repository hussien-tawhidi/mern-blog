import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentAction, updateCommentAction } from "../../app/slices/comments/commentActions";
import { useEffect } from "react";

const formSchema = Yup.object({
  description: Yup.string().required("Comment is required"),
});
export default function UpdateComment() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comment = useSelector((state) => state?.comment);
  const { updateComment,commentDetails } = comment;

  useEffect(() => {
    dispatch(fetchCommentAction(id))
  },[dispatch,id])

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      description: commentDetails?.description,
    },
    onSubmit: (values) => {
      
      const data = {
        id,
        description: values?.description,
      };
      dispatch(updateCommentAction(data));
      navigate(`/posts`);
    },
    validationSchema: formSchema,
  });

  return (
    <div className='add-comment update-comment'>
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
