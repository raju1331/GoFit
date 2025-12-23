// import React from 'react'
import React, { useState, useEffect } from 'react';
 import "./Activity.css";


export default function Activity() {
  const [date, setdate] = useState("");
  const [activityType, setactivityType] = useState("Walking");
  const [goal, setgoal] = useState("Weight loss");
  const [calories, setcalories] = useState("");
  const [duration, setduration] = useState("");
  const [savedData, setSavedData] = useState([]);
  const [steps, setSteps] = useState("");
  useEffect(() => { const history = JSON.parse(localStorage.getItem("activityData") || "[]"); 
    setSavedData(history); }, []);

const calculateBurned = () => { if (!duration) { alert("Enter duration first!"); return; } 
const rates = { Walking: 4, Running: 10, gym: 8, Yoga: 3, Swimming: 9, cycling: 7, Pillates: 4, badminton: 6, other: 5 }; 
const burnRate = rates[activityType] ?? 4; setcalories((duration * burnRate).toString()); 
};
useEffect(() => { const history = JSON.parse(localStorage.getItem("activityData") || "[]"); setSavedData(history); }, []);

  const handleSaves = () => {
        if (!date || !calories || !duration) {
      alert("Please fill all required fields");
      return;
    }
    const newEntry = { date, activityType, goal, calories: parseFloat(calories), duration: parseInt(duration, 10),
    steps: parseInt(steps, 10)};
    const history = JSON.parse(localStorage.getItem("activityData") || "[]");
    const updatedHistory = [...history, newEntry];
    localStorage.setItem("activityData", JSON.stringify([...history, newEntry]));
    setSavedData(updatedHistory);

    alert("Activity saved!");

   
    setcalories("");
    setduration("");
    setSteps("");
  };

 return (
    <div className='activity-container' >
      
        <div className='activity-card'>
          <div className='form-section'>
    <h3 className='activity-title'>Activity</h3>
<form>

    <div className='input-group'>
    <input
      type="date"
      className="form-group"
      placeholder="Date"
      value={date}
      onChange={(e) => setdate(e.target.value)}
     
    />
  
   </div>

 

  <div className="form-group">

    <h5>Activity</h5>
    <select typeof='text' className='form-select' placeholder="Acticity-page" value={activityType} onChange={(e)=>setactivityType(e.target.value)}>
       
      <option>Walking</option>
      <option>Running</option>
      <option>gym</option>
      <option>Yoga</option>
      <option>Swimming</option>
      <option>cycling</option>
      <option>Pillates</option>
      <option>badminton</option>
      <option>other</option>
  </select>
    
  </div>
  <h6>Duration(min)</h6>
  <div className="mb-3">
     <input
      type="number"
      className="form-control"
      placeholder="duration"
      value={duration}
      onChange={(e) => setduration(e.target.value)}
     
    /> 
    <button type="button" className="btn btn-info text-white" onClick={calculateBurned}>Calculate</button>
   
   

  </div>

  <h4>Calories (Kcal)</h4>
<input
  type="number"
  className="form-control"
  placeholder="Calories"
  value={calories}
  onChange={(e) => setcalories(e.target.value)}

  
/>
 <h6>Steps</h6>
            <input type="number" className="form-control" placeholder="Steps covered" value={steps} onChange={(e) => setSteps(e.target.value)}
            />

  <div className="form-group">

    <h5>Goal</h5>
        <select  type="number" className='form-select mt-3' placeholder="goal" value={goal} onChange={(e)=>setgoal(e.target.value)}>
      <option>Weight loss</option>
      <option>Build muscle</option>
      <option>Maintain Fitness</option>
    

    </select>
        
  </div>


  <button
    type="button"
    className='save-btn'
    style={{ backgroundColor: '#FFCC00', color: 'black',padding:'14px',borderRadius:'13px',fontWeight:'bold',alignItems:'center'}}
    onClick={handleSaves}
  >
    Save
  </button>
  

</form>
 </div>
 <div className='history-side'>
     <h3 className='activity-title'>History</h3>
    <div className='history-list'>
  {savedData.map((item, index) => (
  <div key={index} className='history-item'>
    <p>Date: {item.date}</p>
    <p>Activity: {item.activityType}</p>
    <p>Goal: {item.goal}</p>
    <p>Calories: {item.calories}</p>
    <p>Duration: {item.duration}</p>
    <p>steps:{item.steps}</p>
    <hr />
  </div>

))}</div>
</div>


      
    </div>
    </div>
  )
}
