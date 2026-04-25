import { useState } from 'react';

const foodCatalog = [
  { label: 'Avocado Toast', calories: 340, protein: 12, carbs: 32, fat: 18 },
  { label: 'Berry Smoothie', calories: 220, protein: 8, carbs: 38, fat: 4 },
  { label: 'Chicken Bowl', calories: 520, protein: 42, carbs: 45, fat: 16 },
  { label: 'Caesar Salad', calories: 310, protein: 18, carbs: 12, fat: 22 },
  { label: 'Energy Bar', calories: 180, protein: 6, carbs: 24, fat: 8 },
  { label: 'Grilled Salmon', calories: 450, protein: 38, carbs: 0, fat: 32 },
  { label: 'Quinoa Bowl', calories: 380, protein: 14, carbs: 52, fat: 12 },
  { label: 'Greek Yogurt', calories: 150, protein: 18, carbs: 12, fat: 4 },
];

function getFoodRecognition(fileName) {
  const normalized = fileName.toLowerCase();
  const found = foodCatalog.find((item) => 
    normalized.includes(item.label.toLowerCase().split(' ')[0])
  );
  return found || foodCatalog[Math.floor(Math.random() * foodCatalog.length)];
}

export default function FoodAI() {
  const [imageName, setImageName] = useState('No photo selected');
  const [recognizedFood, setRecognizedFood] = useState(null);
  const [message, setMessage] = useState('Upload a meal photo to see AI food recognition in action.');
  const [mealHistory, setMealHistory] = useState([
    { id: 1, label: 'Avocado Toast', calories: 340, time: '8:30 AM' },
    { id: 2, label: 'Berry Smoothie', calories: 220, time: '12:00 PM' },
  ]);

  const handleFoodUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImageName('No photo selected');
      setRecognizedFood(null);
      return;
    }
    setImageName(file.name);
    const recognized = getFoodRecognition(file.name);
    setRecognizedFood(recognized);
    setMessage(`Detected ${recognized.label} with an estimated ${recognized.calories} kcal.`);
    
    setMealHistory((prev) => [
      { id: Date.now(), label: recognized.label, calories: recognized.calories, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ...prev,
    ]);
  };

  const totalCalories = mealHistory.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <span className="section-tag">Food AI</span>
          <h1>AI Food Recognition</h1>
          <p>Camera-based meal logging with intelligent calorie estimation</p>
        </div>
      </header>

      <div className="food-grid">
        <div className="upload-section">
          <div className="upload-card">
            <h3>Upload Meal Photo</h3>
            <p>Take a photo or select an image to analyze</p>
            <label className="file-input">
              <input type="file" accept="image/*" onChange={handleFoodUpload} />
              <span className="upload-icon">📷</span>
              Choose a meal photo
            </label>
            <p className="file-name">{imageName}</p>
          </div>

          {recognizedFood && (
            <div className="food-result">
              <h3>Recognized Food</h3>
              <div className="food-details">
                <div className="food-main">
                  <strong>{recognizedFood.label}</strong>
                  <span className="calories">{recognizedFood.calories} kcal</span>
                </div>
                <div className="macros">
                  <div className="macro">
                    <span>Protein</span>
                    <strong>{recognizedFood.protein}g</strong>
                  </div>
                  <div className="macro">
                    <span>Carbs</span>
                    <strong>{recognizedFood.carbs}g</strong>
                  </div>
                  <div className="macro">
                    <span>Fat</span>
                    <strong>{recognizedFood.fat}g</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="message-card">
            <p>{message}</p>
          </div>
        </div>

        <div className="history-section">
          <div className="history-card">
            <h3>Today's Meals</h3>
            <p className="total-calories">Total: {totalCalories} kcal</p>
            <div className="meal-list">
              {mealHistory.map((meal) => (
                <div key={meal.id} className="meal-item">
                  <div>
                    <strong>{meal.label}</strong>
                    <span className="meal-time">{meal.time}</span>
                  </div>
                  <span className="meal-calories">{meal.calories} kcal</span>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card">
            <h3>How it works</h3>
            <ol>
              <li>Capture or upload a meal image</li>
              <li>AI analyzes ingredients and portions</li>
              <li>Estimates calories and macros</li>
              <li>Updates your daily intake</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}