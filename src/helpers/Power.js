import React, { useState, useEffect} from 'react'
import BenchCard from '../core/BenchCard'
import SquatCard from '../core/SquatCard'
import DeadliftCard from '../core/DeadliftCard'


const Power = ({ athlete_weight, personalRecords, handlePRUpdate}) => {
        const [values, setValues] = useState({
            weight: athlete_weight,
            benchPR: 185,
            squatPR: 295,
            deadliftPR: 340,
            benchArray: [],
            squatArray: [],
            deadliftArray: [],
            sex: 'M'
        })

        useEffect(() => {
            personalRecords.forEach(record => {
                if(record.id === weight) {
                    setValues({...values, benchArray: record.bench,
                        squatArray: record.squat,
                    deadliftArray: record.deadlift})
                }
            });
        }, [])

        const { weight, benchArray, squatArray, deadliftArray } = values


    return (
                <section>
                    <h1>This is Power Page</h1>
                    <h2>Current Weight: {weight}</h2>
                    <br />
                    <br />
                    <h3>Bench</h3>
                    {
                        benchArray ? 
                         benchArray.map((benchWeights, index) => {
                            return <BenchCard key={index} benchWeights={benchWeights}
                            personalRecords={personalRecords} handlePRUpdate={handlePRUpdate}
                            weight={weight} benchArray={benchArray}/>                        
                        }) :
                        <h1>Loading...</h1>
                    }

                    <h3>Squat</h3>
                    {
                        squatArray ? 
                        squatArray.map((squatWeights, index) => {
                            return <SquatCard key={index} squatWeights={squatWeights}
                            personalRecords={personalRecords} handlePRUpdate={handlePRUpdate}
                            weight={weight} squatArray={squatArray}/>                        
                        }) :
                        <h1>Loading...</h1>
                    }

                    <h3>Deadlift</h3>
                    {
                        deadliftArray ? 
                        deadliftArray.map((deadliftWeights, index) => {
                            return <DeadliftCard key={index} deadliftWeights={deadliftWeights}
                            personalRecords={personalRecords} handlePRUpdate={handlePRUpdate}
                            weight={weight} deadliftArray={deadliftArray}/>                        
                        }) :
                        <h1>Loading...</h1>
                    }
                </section>

)}

export default Power