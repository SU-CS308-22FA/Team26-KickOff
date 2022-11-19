import Navbar from "./navigationbar/navigationbar";
import Login from "./pages/login";
import Update from "./pages/update";
import Homepage from "./pages/home";
import { Route, Routes, useNavigate } from "react-router-dom"
import Signup from "./pages/signup";
import Profile from "./pages/Profile"
import Todo from "./components/Todo";
import { useDispatch, useSelector} from "react-redux";

function App() {

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  return (
    <>
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact path="/" element={userInfo ? (<Homepage />) : (<Login/>)} />
          <Route path="/login" element={<Login />} />
          <Route path="/update" element={<Update />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
