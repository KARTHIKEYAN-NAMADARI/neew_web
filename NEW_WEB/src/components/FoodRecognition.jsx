import { useState } from 'react'
import './FoodRecognition.css'

function FoodRecognition() {
  const [recognizing, setRecognizing] = useState(false)
  const [recognizedFood, setRecognizedFood] = useState(null)

  const handleRecognize = () => {
    setRecognizing(true)
    setTimeout(() => {
      setRecognizing(false)
      setRecognizedFood({
        name: 'Grilled Chicken Salad',
        calories: 320,
        protein: 28,
        carbs: 15,
        fat: 12
      })
    }, 3000)
  }

  return (
    <div className="food">
      <h2>AI Food Recognition</h2>
      <p>Use your camera to log meals with AI-powered identification.</p>
      <button onClick={handleRecognize} disabled={recognizing} className="camera-btn">
        {recognizing ? 'Analyzing...' : 'Open Camera'}
      </button>
      {recognizedFood && (
        <div className="food-result">
          <h3>Recognized: {recognizedFood.name}</h3>
          <ul>
            <li>Calories: {recognizedFood.calories}</li>
            <li>Protein: {recognizedFood.protein}g</li>
            <li>Carbs: {recognizedFood.carbs}g</li>
            <li>Fat: {recognizedFood.fat}g</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default FoodRecognition