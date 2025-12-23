import React from 'react'

import "./Nutrition.css";
// import nutritionImg from "../assets/top-view-veggie-salad-bowls-with-couscous-copy-space.jpg";




import { useState ,useEffect} from 'react';

export default function Nutrition() {
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [food, setfood] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState(""); 
  const [carbs, setCarbs] = useState("");
  const [savedData, setSavedData] = useState([]);
 useEffect(() => { const history = JSON.parse(localStorage.getItem("nutritionData") || "[]"); 
  setSavedData(history); }, []);

  const searchNutrition = () => { 
    if (!food.trim()) 
      { alert("Please enter a food item like 'apple' or 'rice'"); 
        return; } 
  const apiKey = "0Aajz4uZchQCSdhkSfyIGa6OPgzffs3KaO8Bd311"; 
  const apiURL = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(food)}&api_key=${apiKey}`;
  fetch(apiURL) 
  .then(res => { 
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`); 
  return res.json(); }) 
  .then(data => { 
    if (data.foods && data.foods.length > 0) 
    {const nutrients = data.foods[0].foodNutrients;
     const protein = nutrients.find(n => n.nutrientName === "Protein");
     const fat = nutrients.find(n => n.nutrientName === "Total lipid (fat)");
     const carbs = nutrients.find(n => n.nutrientName === "Carbohydrate, by difference");
     setProtein(protein ? protein.value.toString() : "");
     setFat(fat ? fat.value.toString() : "");
     setCarbs(carbs ? carbs.value.toString() : "");
     const energy = nutrients.find(n => n.nutrientName === "Energy"); 
     setCalories(energy ? energy.value.toString() : "Not found"); } 
       else { alert("Food not found. Try simpler names like 'apple' or 'egg'."); 
        setCalories(""); } })
        .catch(err => { console.error("Fetch Error:", err);
          alert("Failed to fetch nutrition data. Check API key or query."); }); 
        };

  const handleSaves = () => {
        if (!date|| !food || !calories) {
      alert("Please fill all required fields");
      return;
    }
    const newEntry = { date, mealType, food, calories,protein,fat,carbs:parseFloat(calories)};
    setSavedData([...savedData, newEntry]);

    const history = JSON.parse(localStorage.getItem("nutritionData") || "[]");
    localStorage.setItem("nutritionData", JSON.stringify([...history, newEntry]));

    alert("Nutrition data saved!");
    setfood(""); 
    setCalories("");
    setCarbs("");
    setFat("");
    setProtein("");
  };


 return (
    <div className="nutrition-container">
<div className="nutrition-form-card">

     
      <h5 className='nutrition-title'>Nutrition</h5>
<form onSubmit={(e) => e.preventDefault()}>
  <div className="mb-3">
    <input
      type="date"
      className="form-control"
      placeholder="Date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      
    />
   
   

  </div>

  <div className="mb-3">
  
    <h6>Meal Type</h6>
    <select typeof='text' className='form-select mt-3' placeholder="Activity-page" value={mealType} onChange={(e)=>setMealType(e.target.value)}>
      <option>Breakfast</option>
      <option>Lunch</option>
      <option>Snack</option>
      <option>Dinner</option>
  </select>
  <h6 className='mt-3'>Food Item</h6>
  <div className="d-flex gap-2">
  <input
  type="text"
  className="form-control"
  placeholder="e.g. 1 apple"
  value={food}
  onChange={(e) => setfood(e.target.value)}
  
/>
<button 
  type="button" 
  className="btn btn-info" 
 onClick={() => {
    alert("Button clicked");
    searchNutrition();
  }} 
>
  Get Calories
</button>
    
  </div>
  </div>
  
  <h6>Calories (Kcal)</h6>
<input
  type="number"
  className="form-control"
  placeholder="Calories"
  value={calories}
  onChange={(e) => setCalories(e.target.value)}
/>
<h6>Protein (g)</h6>
          <input type="number"
           className="form-control"
            value={protein} 
            onChange={(e) => setProtein(e.target.value)}
          />
<h6>Fat (g)</h6>
          <input type="number" 
          className="form-control" 
          value={fat} 
          onChange={(e) => setFat(e.target.value)}
          />


<h6>Carbs (g)</h6>
          <input type="number"
           className="form-control"
           value={carbs}
           onChange={(e) => setCarbs(e.target.value)}
          />

  <button
    type="button"
    style={{ backgroundColor: '#FFCC00', color: 'black',padding:'17px',borderRadius:'15px',fontWeight:'bold',alignItems:'center'}}
    onClick={handleSaves}
  >
    Save
  </button>
  {savedData.map((item, index) => (
  <div key={index}>
    <p>Date: {item.date}</p>
    <p>meal Type: {item.mealType}</p>
    <p>Foot item: {item.food}</p>
    <p>Calories: {item.calories}</p>
    <p>Protein: {item.protein}</p>
    <p>fat: {item.fat}</p>
    <p>carbs: {item.carbs}</p>
    <hr />
  </div>
))}
</form>
</div>




      
    </div>
  );
}
