import React from "react";
// import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./authTest/Profile";
import Login from "./authTest/Login";
import User from "./pages/User";


const Home=()=>{
  return(
    <div>Home</div>
  )
}

// function App() {
//   return (
//     <Router>
//       <header>Header</header>
//       <NavBar />
//       <div className="main">
//         <Routes>
//           <Route path="/home" element={<Home />} />
//           <Route path="/users" element={<User />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

function App(){
  return(
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App;
