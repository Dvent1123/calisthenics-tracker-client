import React from 'react'
import Card from '../core/Card'

const Cali = ({handleSkillUnlock, skills}) => {
    
    return (
        <section>
            <h1>This is Cali Page</h1>
            {
                skills ?
                skills.map((skill, index) => {
                    return <Card skill={skill} key={index} handleSkillUnlock={handleSkillUnlock}/>
                }) :
                <h1>Loading...</h1>
            }
        </section>
)}

export default Cali