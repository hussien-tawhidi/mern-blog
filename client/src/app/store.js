import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/users/usersSlice";
import categorySlices from "./slices/category/CategorySlice";
import postSlice from "./slices/posts/postSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    category: categorySlices,
    post: postSlice,
  },
});
