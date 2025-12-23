import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar,Pie } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend,ArcElement);

export default function Dashboard() {
  const [vitals, setVitals] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [activity, setActivity] = useState([]);
  
  useEffect(() => {
    setVitals(JSON.parse(localStorage.getItem("vitalsData") || "[]"));
    setNutrition(JSON.parse(localStorage.getItem("nutritionData") || "[]"));
    setActivity(JSON.parse(localStorage.getItem("activityData") || "[]"));
  }, []);

  const commonOptions = {
    responsive: true,
    plugins: { legend: { labels: { color: 'white' } } },
    scales: {
      y: { ticks: { color: 'white' }, grid: { color: '#444' } },
      x: { ticks: { color: 'white' }, grid: { color: '#444' } }
    }
  };

  
  const heartRateChart = {
    labels: vitals.map(v => v.date),
    datasets: [{
      label: 'Heart Rate (BPM)',
      data: vitals.map(v => Number(v.heartRate) || 0),
      borderColor: '#FFCC00',
      backgroundColor: 'rgba(255, 204, 0, 0.2)',
      tension: 0.4,
      fill: true
    }]
  };


  const calorieChart = {
    labels: nutrition.map(n => n.date),
    datasets: [
      { label: 'Calories In', data: nutrition.map(n => n.calories), backgroundColor: '#af4c99ff' },
      { label: 'Calories Out', data: activity.map(a => a.calories), backgroundColor: '#52fff9ff' }
    ]
  };
  const stepsChart = {
  labels: activity.map(a => a.date),
  datasets: [{
    label: 'Steps',
    data: activity.map(a => a.steps),
    borderColor: '#00BFFF',
    backgroundColor: 'rgba(0, 191, 255, 0.2)',
    tension: 0.4,
    fill: true
  }]
};
const latestNutrition = nutrition[nutrition.length - 1] || {};
 const macroChart = { labels: ['Protein', 'Fat', 'Carbs'], 
  datasets: [{ data: [latestNutrition.protein || 0, latestNutrition.fat || 0, latestNutrition.carbs || 0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }] };



  return (
  
    <div className="container mt- 1 text-white">
      <h2 className="text-center mb-0" style={{color: '#FFCC00'}}>FITNESS ANALYTICS</h2>

      <div className="row mb-2">
        <div className="col-md-3">
          <div className="p-3 text-center" style={{background: 'rgba(255,255,255,0.1)', borderRadius: '15px'}}>
            <h6>Latest Blood Pressure</h6>
            <h3>{vitals.length > 0 ? vitals[vitals.length - 1].bloodPressure : "--"} <small>mmHg</small></h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 text-center" style={{background: 'rgba(255,255,255,0.1)', borderRadius: '15px'}}>
            <h6>Current Temp</h6>
            <h3>{vitals.length > 0 ? vitals[vitals.length - 1].temperature : "--"}°C</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 text-center" style={{background: 'rgba(255,255,255,0.1)', borderRadius: '15px'}}>
            <h6>Entries Logged</h6>
            <h3>{vitals.length + nutrition.length + activity.length}</h3>
          </div>
        </div>
      </div>

      <div className="row">
       
        <div className="col-md-6 mb-2">
          <div className="p-4" style={{background: 'rgba(0,0,0,0.4)', borderRadius: '25px', border: '1px solid #444'}}>
            <h5>Heart Rate History</h5>
            <Line data={heartRateChart} options={commonOptions} />
          </div>
        </div>
<div className="col-md-5 mb-2">
  <div className="p-4" style={{background: 'rgba(0,0,0,0.4)', borderRadius: '20px', border: '1px solid #444'}}>
    <h5>Steps Trend</h5>
    <Line data={stepsChart} options={commonOptions} />
  </div>
</div>


        
        <div className="col-md-6 mb-2">
          <div className="p-4" style={{background: 'rgba(0,0,0,0.4)', borderRadius: '25px', border: '1px solid #444'}}>
            <h5>Daily Calorie Balance</h5>
            <Bar data={calorieChart} options={commonOptions} />
          </div>
        </div>
                <div className="col-md-6 mb-3">
          <div className="p-4" style={{background: 'rgba(0,0,0,0.4)', borderRadius: '25px', border: '1px solid #444'}}>
            <h5>Nutrition Macros</h5>
            <Pie data={macroChart} options={commonOptions} />
          </div>
        </div>
      </div>
        <button className="btn btn-danger" 
  onClick={() => {
    localStorage.removeItem("nutritionData");
    localStorage.removeItem("activityData");
    localStorage.removeItem("vitalsData");
    alert("All fitness data cleared! You can now enter new data.");
    window.location.reload(); 
  }}
  
>
  Reset Data
</button>

      </div>
    
    
  );
}