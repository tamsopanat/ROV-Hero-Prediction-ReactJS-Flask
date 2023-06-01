// import React, { useState, useEffect} from 'react'
import Forminput from "./components/Forminput"
import Output from "./components/Output"
import { useState } from 'react';
function App() {
  const [heroPredict, setheroPredict] = useState('Result')
  const [heroURL, setheroURL] = useState('')
  const resultReturn = (resultModel) => {
    console.log(`Result in App : ${resultModel.heroPredict}`)
    setheroPredict(resultModel.heroPredict)
    setheroURL(resultModel.heroURL)
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: 'bold' }}>ROV Hero Prediction</h1>
      <Forminput onAddResult={resultReturn} />
      <Output heroPredict={[heroPredict, heroURL]} />

    </div>
  )
}

export default App