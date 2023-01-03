import Navbar from "./navigationbar/navigationbar";
import Login from "./pages/login";
import Update from "./pages/update";
import Homepage from "./pages/home";
import Accordion from "./pages/upcomingmatches";
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/signup";
import Profile from "./pages/Profile"
import Referee from "./pages/referee"
import League from "./pages/league"
import Matches from "./pages/matches";
import UpcomingMatches from "./pages/upcomingmatches";
import Todo from "./components/Todo";
import Team from "./pages/Team";
import Player from "./pages/Players";
import TeamDetails from "./pages/detailed_team";

import NewsAddDelete from "./pages/newsAddDelete"


import PlayerAddAdmin from "./pages/playerAddAdmin";
import MatchAddAdmin from "./pages/matchAddAdmin";
import TeamAddAdmin from "./pages/teamAddAdmin";
import TeamDelete from "./pages/teamAdminDelete";

import News from "./pages/newspage";



import TeamComparison from "./pages/team_comparison"

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
          <Route exact path="/update" element={userInfo ? userInfo.isAdmin ? (<Update/>) : (<Profile/>) : (<Login/>)} />
          <Route exact path="/addPlayer" element={userInfo ? userInfo.isAdmin ? (<PlayerAddAdmin/>) : (<Profile/>) : (<Login/>)} />
          <Route exact path="/addMatch" element={userInfo ? userInfo.isAdmin ? (<MatchAddAdmin/>) : (<Profile/>) : (<Login/>)} />
          <Route exact path="/addTeam" element={userInfo ? userInfo.isAdmin ? (<TeamAddAdmin/>) : (<Profile/>) : (<Login/>)} />
          <Route exact path="/deleteTeam" element={userInfo ? userInfo.isAdmin ? (<TeamDelete/>) : (<Profile/>) : (<Login/>)} />


          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/league" element={<League />} />

          <Route path="/teams" element={<Team />} />
          <Route path="/players" element={<Player />} />
          <Route path="/referees" element={<Referee />} />

          <Route path="/todo" element={<Todo />} />
          <Route path="/matches" element={<Matches />} />


          <Route path="/upcomingmatches" element={<UpcomingMatches />} />


          <Route path="/newspage" element={<News />} />
          <Route path="/newsadddelete" element={<NewsAddDelete />} />

          <Route path="/team_comparison" element={<TeamComparison />} />

          <Route path="/detailed_team" element={<TeamDetails />} />


        </Routes>
      </div>
    </>
  )
}

export default App;
