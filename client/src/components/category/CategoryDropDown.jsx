import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchCategories } from "../../app/slices/category/CategoryAction";


const CategoryDropDown = (props) => {
  //dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  //select categories
  const category = useSelector((state) => state?.category);
  const { categoryList, loading } = category;

  const allCategories = categoryList?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });

  //handleChange
  const handleChange = (value) => {
    props.onChange("category", value);
  };
  //handleBlur
  const handleBlur = () => {
    props.onBlur("category", true);
  };
  return (
    <div>
      {loading ? (
        <h3 className='text-base text-green-600'>
          Product categories list are loading please wait...
        </h3>
      ) : (
        <div className='category-select-options'>
          <Select
            onChange={handleChange}
            onBlur={handleBlur}
            id='category'
            options={allCategories}
            value={props?.value?.label}
          />
        </div>
      )}
      {/* Display */}
      {props?.error && (
        <div className='custome-alert-danger mx-4'>{props?.error}</div>
      )}
    </div>
  );
};

export default CategoryDropDown;
