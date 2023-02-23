import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
} from "../../app/slices/category/CategoryAction";
import moment from "moment";
import { Link } from "react-router-dom";
import Loader from "../../utils/Loader";
export default function CategoryLists() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const category = useSelector((state) => state?.category);

  const { categoryList, loading, appErr, serverErr } = category;
  // console.log(categoryList);
  return (
    <div className='category-list'>
      {loading ? (
        <Loader/>
      ) : appErr || serverErr ? (
        <h2>
          {serverErr}
          {appErr}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2>no category found</h2>
      ) : (
        <>
          {categoryList?.map((cat) => (
            <div className='single-category-list' key={cat._id}>
              <div className='container'>
                <table className='table'>
                  <thead>
                    <tr>
                      <div className='row'>
                        <div className='col-3'>
                          <th scope='col'>
                            <p className='table-title'>AUTHOR</p>
                          </th>
                        </div>
                        <div className='col-3'>
                          <th scope='col'>
                            <p className='table-title'>TITLE</p>
                          </th>
                        </div>
                        <div className='col-3'>
                          <th scope='col'>
                            <p className='table-title'>CREATEAT</p>
                          </th>
                        </div>
                        <div className='col-3'>
                          <th scope='col'>
                            <p className='table-title'>EDIT</p>
                          </th>
                        </div>
                      </div>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <div className='row'>
                        <div className='col-3'>
                          <td className='d-flex align-items-center user'>
                            <img
                              src={cat?.user?.profilePhoto}
                              alt=''
                              className='img-fluid avatar'
                            />
                            <span className='info'>
                              <p className='text-capitalize'>
                                {cat?.user?.firstName} {cat?.user?.lastName}
                              </p>
                              <p> {cat?.user?.email}</p>
                            </span>
                          </td>
                        </div>
                        <div className='col-3'>
                          <td className='h-100 d-flex align-items-center tab-menu'>
                            {cat.title}
                          </td>
                        </div>
                        <div className='col-3'>
                          <td className='h-100 d-flex align-items-center tab-menu'>
                            {moment(cat.createdAt).startOf().fromNow()}
                          </td>
                        </div>
                        <div className='col-3'>
                          <div className='d-flex justify-content-center align-items-center'>
                            {" "}
                            <Link
                              to={`/update-category/${cat._id}`}
                              className='h-100 d-flex align-items-center tab-menu mx-3'>
                              <button className='btn btn-dark'>
                                <i className='bi bi-pencil-square'></i>
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
