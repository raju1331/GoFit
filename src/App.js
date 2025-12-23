import { useState } from "react";
import Navbar from "./Components/Navbar";
import Vitals from "./Components/Vitals";
import Activity from "./Components/Activity";
import About from "./Components/About";
import Nutrition from "./Components/Nutrition";
import Home from"./Components/Home";
import Dashboard from "./Components/Dashboard";

function App() {
  const [page, setPage] = useState("home");
  // const [vital,setvital]=useState("vitals");
  // const [acticity,setactivity]=useState("Activity");

  return (
    <>
    <div>
      <Navbar setPage={setPage} />
     
      
      {page==="home"&&<Home/>}
      {page==="vitals" &&<Vitals/>}
       {page==="activity" &&<Activity/>}
       {page==="nutrition" &&<Nutrition/>}
       {page==="about" &&<About/>}
       {page === "dashboard" && <Dashboard />}
      
       

    
    </div>
    </>
  );
}

export default App;
