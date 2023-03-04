import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./components/logs/profile/Profile";
import Home from "./components/home/Home";
import Login from "./components/logs/Login";
import Register from "./components/logs/profile/Register";
import Navbar from "./components/navegation/Navbar";
import AddCategory from "./components/category/AddCategory";
import CategoryLists from "./components/category/CategoryLists";
import UpdateCategory from "./components/category/UpdateCategory";
import NotFound from "./components/notFound/NotFound";
import NotAllowed from "./components/notFound/NotAllowed";
import CreatePosts from "./components/posts/createPosts/CreatePosts";
import Posts from "./components/posts/posts/Posts";
import PostDetails from "./components/posts/PostDetails";
import UpdatePost from "./components/posts/UpdatePost";
import UpdateComment from "./components/comments/UpdateComment";
import UploadPhotos from "./components/logs/profile/UploadPhotos";
import UpdateProfile from "./components/logs/profile/UpdateProfile";
import SendEmail from "./components/logs/profile/SendEmail";
import AccountVerified from "./components/logs/profile/AccountVerified";
import Authors from "./components/authors/Authors";
import UpdatePassword from "./components/logs/UpdatePassword";
import ResetPassword from "./components/logs/forgotPass/ResetPassword";
import ResetPasswordForm from "./components/logs/forgotPass/ResetPasswordForm";
function App() {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={!userAuth && <Register />} />
          <Route path='/reset-password-token' element={<ResetPasswordForm />} />
          <Route path='/forget/password/:id' element={<ResetPassword />} />
          <Route
            path='/create-post'
            element={userAuth ? <CreatePosts /> : <Login />}
          />
          <Route
            path='/update-password'
            element={userAuth ? <UpdatePassword /> : <Login />}
          />
          <Route
            path='/send-email/:id'
            element={userAuth ? <SendEmail /> : <Login />}
          />
          <Route path='/users' element={userAuth ? <Authors /> : <Login />} />
          <Route
            path='/verify/account/:id'
            element={userAuth ? <AccountVerified /> : <Login />}
          />
          <Route
            path='/update-post/:id'
            element={userAuth ? <UpdatePost /> : <Login />}
          />
          <Route path='/login' element={!userAuth ? <Login /> : <Home />} />
          <Route
            path='/profile/:id'
            element={userAuth ? <Profile /> : <Home />}
          />
          <Route path='/' element={<Home />} />
          <Route
            path='/add-category'
            element={userAuth?.isAdmin ? <AddCategory /> : <NotAllowed />}
          />
          <Route
            path='/update-category/:id'
            element={userAuth?.isAdmin ? <UpdateCategory /> : <NotAllowed />}
          />
          <Route
            path='/upload-profile-photo'
            element={userAuth ? <UploadPhotos /> : <NotAllowed />}
          />
          <Route
            path='/update-profile'
            element={userAuth ? <UpdateProfile /> : <NotAllowed />}
          />
          <Route
            path='/category-list'
            element={userAuth?.isAdmin ? <CategoryLists /> : <NotAllowed />}
          />
          <Route
            path='/update-comment/:id'
            element={userAuth?.isAdmin ? <UpdateComment /> : <NotAllowed />}
          />
          <Route path='/posts' element={<Posts />} />
          <Route path='/post-details/:id' element={<PostDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
