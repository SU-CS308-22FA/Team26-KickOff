import Navbar from "./navigationbar/navigationbar";
import Login from "./pages/login";
import Update from "./pages/update";
import Home from "./pages/home";
import { Route, Routes} from "react-router-dom"
import Signup from "./pages/signup";
import Todo from "./components/Todo";

function App() {
  return  ( 
  <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/update" element={<Update />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/todo" element={<Todo />}/>
      </Routes>
    </div>
  </>
  )
}

export default App;
