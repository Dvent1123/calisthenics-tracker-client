import React from 'react'
import Card from '../core/Card'

const Cali = ({handleSkillUnlock, skills}) => {
    return (
        <section>
            <div className="stats-title-container">
                <h1>CALISTHENICS</h1>
                <p>"I'm the guy doing calisthenics. I'm doing jumping jacks and deep knee bends. I work out like a British person." - Ryan Reynolds</p>
            </div>
            <br />
            <br />
            <div className="real-card-container">
            {
                skills ?
                skills.map((skill, index) => {
                    return <Card skill={skill} key={index} handleSkillUnlock={handleSkillUnlock}/>
                }) :
                <h1>Loading...</h1>
            }
            </div>
        </section>
)}

export default Cali