import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/logs/Profile";
import Home from "./components/home/Home";
import Login from "./components/logs/Login";
import Register from "./components/logs/Register";
import Navbar from "./components/navegation/Navbar";
import AddCategory from "./components/category/AddCategory";
import CategoryLists from "./components/category/CategoryLists";
import UpdateCategory from "./components/category/UpdateCategory";
import { useSelector } from "react-redux";
import NotFound from "./components/notFound/NotFound";
import NotAllowed from "./components/notFound/NotAllowed";
import CreatePosts from "./components/posts/CreatePosts";
function App() {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  // const { isAdmin } = userAuth;
  console.log(userAuth + " _ admin");
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/create-post'
            element={userAuth ? <CreatePosts /> : <Login />}
          />

          {/* ------------------------------ */}
          {/* protected Routes  */}
          {/* ------------------------------ */}
          <Route path='/profile' element={userAuth && <Profile />} />
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
            path='/category-list'
            element={userAuth?.isAdmin ? <CategoryLists /> : <NotAllowed />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
