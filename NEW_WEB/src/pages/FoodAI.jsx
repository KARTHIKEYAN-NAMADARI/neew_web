import { useState, useRef } from 'react';

const foodCatalog = [
  { label: 'Avocado Toast', calories: 340, protein: 12, carbs: 32, fat: 18 },
  { label: 'Berry Smoothie', calories: 220, protein: 8, carbs: 38, fat: 4 },
  { label: 'Chicken Bowl', calories: 520, protein: 42, carbs: 45, fat: 16 },
  { label: 'Caesar Salad', calories: 310, protein: 18, carbs: 12, fat: 22 },
  { label: 'Energy Bar', calories: 180, protein: 6, carbs: 24, fat: 8 },
  { label: 'Grilled Salmon', calories: 450, protein: 38, carbs: 0, fat: 32 },
  { label: 'Quinoa Bowl', calories: 380, protein: 14, carbs: 52, fat: 12 },
  { label: 'Greek Yogurt', calories: 150, protein: 18, carbs: 12, fat: 4 },
  { label: 'Pasta Carbonara', calories: 650, protein: 25, carbs: 55, fat: 35 },
  { label: 'Vegetable Stir Fry', calories: 280, protein: 12, carbs: 35, fat: 14 },
  { label: 'Beef Burger', calories: 550, protein: 30, carbs: 40, fat: 28 },
  { label: 'Fruit Salad', calories: 120, protein: 3, carbs: 30, fat: 1 },
];

function simulateAIAnalysis(imageFile) {
  // Simulate AI processing time
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly select a food item (in real app, this would be AI analysis)
      const detectedFood = foodCatalog[Math.floor(Math.random() * foodCatalog.length)];
      // Add some randomness to make it more realistic
      const variation = 0.8 + Math.random() * 0.4; // 80-120% variation
      resolve({
        ...detectedFood,
        calories: Math.round(detectedFood.calories * variation),
        protein: Math.round(detectedFood.protein * variation),
        carbs: Math.round(detectedFood.carbs * variation),
        fat: Math.round(detectedFood.fat * variation),
        confidence: Math.round((0.7 + Math.random() * 0.3) * 100), // 70-100% confidence
      });
    }, 2000); // 2 second analysis time
  });
}

export default function FoodAI() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [recognizedFood, setRecognizedFood] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [message, setMessage] = useState('Upload a meal photo to see AI food recognition in action.');
  const [mealHistory, setMealHistory] = useState([
    { id: 1, label: 'Avocado Toast', calories: 340, protein: 12, carbs: 32, fat: 18, time: '8:30 AM', confidence: 85 },
    { id: 2, label: 'Berry Smoothie', calories: 220, protein: 8, carbs: 38, fat: 4, time: '12:00 PM', confidence: 92 },
  ]);

  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
    setAnalyzing(true);
    setMessage('Analyzing your meal photo...');

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);

    try {
      const analysisResult = await simulateAIAnalysis(file);
      setRecognizedFood(analysisResult);
      setEditedValues(analysisResult);
      setMessage(`Detected ${analysisResult.label} with ${analysisResult.confidence}% confidence.`);
    } catch (error) {
      setMessage('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setEditedValues({ ...recognizedFood });
  };

  const handleSave = () => {
    const updatedFood = { ...editedValues };
    setRecognizedFood(updatedFood);
    setEditing(false);

    // Add to meal history
    setMealHistory((prev) => [
      {
        id: Date.now(),
        ...updatedFood,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev,
    ]);

    setMessage(`Meal logged: ${updatedFood.label} (${updatedFood.calories} kcal)`);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedValues({ ...recognizedFood });
  };

  const handleInputChange = (field, value) => {
    setEditedValues((prev) => ({
      ...prev,
      [field]: parseInt(value) || 0,
    }));
  };

  const totalCalories = mealHistory.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = mealHistory.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = mealHistory.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = mealHistory.reduce((sum, meal) => sum + meal.fat, 0);

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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={analyzing}
              />
              <span className="upload-icon">📷</span>
              {analyzing ? 'Analyzing...' : 'Choose a meal photo'}
            </label>
            {selectedImage && (
              <p className="file-name">{selectedImage.name}</p>
            )}
          </div>

          {imagePreview && (
            <div className="image-preview">
              <h3>Meal Photo</h3>
              <img src={imagePreview} alt="Meal preview" className="preview-image" />
            </div>
          )}

          {analyzing && (
            <div className="analysis-progress">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <p>AI is analyzing your meal...</p>
            </div>
          )}

          {recognizedFood && !editing && (
            <div className="food-result">
              <h3>Analysis Results</h3>
              <div className="confidence-badge">
                {recognizedFood.confidence}% confidence
              </div>
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
              <div className="action-buttons">
                <button onClick={handleEdit} className="edit-btn">Edit Values</button>
                <button onClick={handleSave} className="save-btn">Log Meal</button>
              </div>
            </div>
          )}

          {editing && (
            <div className="food-result editing">
              <h3>Edit Nutritional Values</h3>
              <div className="edit-form">
                <div className="edit-field">
                  <label>Food Name:</label>
                  <input
                    type="text"
                    value={editedValues.label}
                    onChange={(e) => setEditedValues(prev => ({ ...prev, label: e.target.value }))}
                  />
                </div>
                <div className="edit-field">
                  <label>Calories (kcal):</label>
                  <input
                    type="number"
                    value={editedValues.calories}
                    onChange={(e) => handleInputChange('calories', e.target.value)}
                  />
                </div>
                <div className="edit-field">
                  <label>Protein (g):</label>
                  <input
                    type="number"
                    value={editedValues.protein}
                    onChange={(e) => handleInputChange('protein', e.target.value)}
                  />
                </div>
                <div className="edit-field">
                  <label>Carbs (g):</label>
                  <input
                    type="number"
                    value={editedValues.carbs}
                    onChange={(e) => handleInputChange('carbs', e.target.value)}
                  />
                </div>
                <div className="edit-field">
                  <label>Fat (g):</label>
                  <input
                    type="number"
                    value={editedValues.fat}
                    onChange={(e) => handleInputChange('fat', e.target.value)}
                  />
                </div>
              </div>
              <div className="action-buttons">
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                <button onClick={handleSave} className="save-btn">Save & Log</button>
              </div>
            </div>
          )}

          <div className="message-card">
            <p>{message}</p>
          </div>
        </div>

        <div className="history-section">
          <div className="history-card">
            <h3>Today's Nutrition Summary</h3>
            <div className="nutrition-summary">
              <div className="summary-item">
                <span className="summary-label">Total Calories</span>
                <span className="summary-value">{totalCalories} kcal</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Protein</span>
                <span className="summary-value">{totalProtein}g</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Carbs</span>
                <span className="summary-value">{totalCarbs}g</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Fat</span>
                <span className="summary-value">{totalFat}g</span>
              </div>
            </div>
          </div>

          <div className="history-card">
            <h3>Meal History</h3>
            <div className="meal-list">
              {mealHistory.map((meal) => (
                <div key={meal.id} className="meal-item">
                  <div className="meal-info">
                    <strong>{meal.label}</strong>
                    <span className="meal-time">{meal.time}</span>
                    {meal.confidence && (
                      <span className="confidence-small">{meal.confidence}%</span>
                    )}
                  </div>
                  <div className="meal-nutrition">
                    <span className="meal-calories">{meal.calories} kcal</span>
                    <span className="meal-macros">{meal.protein}g P, {meal.carbs}g C, {meal.fat}g F</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card">
            <h3>How AI Analysis Works</h3>
            <ol>
              <li>Upload or capture a meal photo</li>
              <li>AI analyzes ingredients and portions</li>
              <li>Estimates calories and macronutrients</li>
              <li>Review and edit values if needed</li>
              <li>Log meal to track daily intake</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}