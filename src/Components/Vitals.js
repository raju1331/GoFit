import React from 'react'
import { useState } from 'react';
import "./vital.css";

export default function Vitals() {
  // const [Vitals,setVitals]=useState("vitals");
const [heartRate, setHeartRate] = useState("");
const [heartrateunit]=useState("bpm");
const [bloodPressure, setbloodPressure] = useState("");
const [bloodPressureunit] = useState("mmHg");
const [bodyPosition, setBodyPosition] = useState("sitting");
const [armLocation, setArmLocation] = useState("Left Wrist");
const [tempearture, settempearture] = useState("");
const [tempunit,setTempunit]=useState("°C")
const [tempreadingloc, settempReadingLoca] = useState("Mouth");
const [date, setdate] = useState("");

const [savedData, setSavedData] = useState(null);
const handleSave=()=> {
  const newEntry={
    date,heartRate,heartrateunit,bloodPressure,bloodPressureunit,bodyPosition,armLocation,
    tempreadingloc,tempearture,tempunit
  };
setSavedData(newEntry);


  const history = JSON.parse(localStorage.getItem("vitalsData") || "[]");
  localStorage.setItem("vitalsData", JSON.stringify([...history, newEntry]));

  alert("Vitals saved to history!");
};

  return (
    <div className="vitals-page-container">
      <div className='vitals-card'>
      
<form className='vitals-form'>
   <div className='input-group'>
   
    <input
      type="date"
      className="form-group"
      placeholder="Date"
      value={date}
      onChange={(e) => setdate(e.target.value)}
     
    />
  
   </div>

  <div className="mb-3">
    <div className='input-section'>
    <label>Heart rate (bpm)</label>
    <input
      type="number"
      className="form-control"
      placeholder="Heart Rate"
      value={heartRate}
      onChange={(e) => setHeartRate(e.target.value)}
      
    />
    {/* <small className='text-muted'>bpm</small> */}
</div>
  </div>

  <div className="mb-3">
    <label>bloodPressure (mmHg)</label>
    <input
      type="number"
      className="form-control"
      placeholder="Blood Pressure"
      value={bloodPressure}
      onChange={(e) => setbloodPressure(e.target.value)}
      
    />

    {/* <small className='text-muted'>mmHg</small> */}
    <div className='vitals-grid-row'>
    <div className="select-group">
      <h6>Body Position</h6>
    <select className='form-select mt-3' value={bodyPosition} onChange={(e)=>setBodyPosition(e.target.value)}>
      <option>Standing</option>
      <option>Sitting</option>
      <option>Lying down</option>
      <option>Reclining</option>
  
    </select>
    </div>
    <div className='select-group'>
    <h6>Arm Location</h6>
        <select className='form-select mt-3' value={armLocation} onChange={(e)=>setArmLocation(e.target.value)}>
      <option>Left Wrist</option>
      <option>Right Wrist</option>
      <option>Left Upper arm</option>
      <option>Right Upper arm </option>
  
    </select>
    {/* <small className='text-muted'>mmHg</small> */}
    </div>

</div>

  </div>
<div className='vitals-grid-row'>
  <div className="mb-3">
    <input
      type="number"
      className="form-control"
      placeholder="tempearture"
      value={tempearture}
      onChange={(e) => settempearture(e.target.value)}
      
    />
    <div className='select-group'>
    <h6>Unit</h6>
        <select className='form-select mt-3' value={tempunit} onChange={(e)=>setTempunit(e.target.value)}>
      <option>°C</option>
      <option>°F</option>
    

    </select>
    </div>
    </div>
    <div className='input-section'>
    <h6>Reading Loaction</h6>
        <select className='input-section' value={tempreadingloc} onChange={(e)=>settempReadingLoca(e.target.value)}>
      <option>Armpit</option>
      <option>finger</option>
      <option>Mouth</option>
      <option>Toe</option>
       <option>ForeHead</option>
        <option>Ear</option>
         <option>Wrist</option>
         
    </select>
    </div>
    {/* <small className='text-muted'>°C</small> */}
  </div>


  <button
    type="button"
    className='vitals-save-btn'
    onClick={handleSave}
  >
    Save
  </button>
</form>


{savedData && (
  <div>
    <h4>Saved Vitals</h4>
    <p>Date:{savedData.date}</p>
    <p>HeartRate: {savedData.heartRate} bpm </p>
    <p>bloodPressure: {savedData.bloodPressure} mmHg<br/>
      position: {savedData.bodyPosition},  Arm: {savedData.armLocation}
    </p>
    <p>tempearture: {savedData.tempearture} °C<br/>
    Reading Loaction: {savedData.tempreadingloc},  tempearture Unit: {savedData.tempunit}</p>
    </div>
)}

</div>
      
    </div>
  )
}

