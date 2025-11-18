import React from 'react'
import "./Content.css"

const Air_content = () => {
  return (
   <>
   <div style={{padding:"10px",boxSizing:"border-box",backgroundColor:"#ffffff9d",borderRadius:"8px",height:"100%"}}>
      <h2>Air Pollution</h2>

      <h3>Definition</h3>
      <p>
        Air pollution refers to the presence of harmful substances in the atmosphere 
        that alter its natural composition, causing adverse effects on human health, 
        environment, and climate.
      </p>

      <h3>Types</h3>
      <ul>
        <li><b>Natural Pollution:</b> Volcanic eruptions, forest fires, dust storms.</li>
        <li><b>Anthropogenic Pollution:</b> Industrial emissions, vehicular exhaust, agriculture.</li>
        <li><b>Primary Pollutants:</b> Emitted directly (CO, SO₂, NOₓ, PM).</li>
        <li><b>Secondary Pollutants:</b> Formed in atmosphere (ozone, smog, PAN).</li>
        <li><b>Indoor & Outdoor Pollution:</b> Household smoke, chemicals, industrial smog.</li>
      </ul>

      <h3>Causes</h3>
      <ul>
        <li>Industrialization and factory emissions</li>
        <li>Vehicular exhaust gases</li>
        <li>Burning of fossil fuels (coal, petrol, diesel)</li>
        <li>Agricultural activities (fertilizers, pesticides, stubble burning)</li>
        <li>Deforestation and household waste burning</li>
      </ul>

      <h3>Effects</h3>
      <ul>
        <li><b>On Health:</b> Respiratory issues, heart problems, eye/skin irritation.</li>
        <li><b>On Environment:</b> Global warming, acid rain, ozone depletion, smog.</li>
        <li><b>On Economy:</b> Healthcare costs, reduced crop yield, infrastructure damage.</li>
      </ul>

      <h3>Control Measures</h3>
      <ul>
        <li><b>Individual:</b> Use public transport, conserve energy, plant trees, avoid burning waste.</li>
        <li><b>Industrial:</b> Install filters/scrubbers, shift to renewable energy, promote electric vehicles.</li>
        <li><b>Government:</b> Enforce air quality laws, afforestation drives, awareness programs.</li>
      </ul>
      </div>
    </>
  )
}

export default Air_content
