import React from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import Power from '../helpers/Power'
import Cali from '../helpers/Cali'
import Oly from '../helpers/Oly'
import Other from '../helpers/Other'

const Athlete = props => {
    let { skills, athlete_type, weight, personalRecords, handlePRUpdate } = props
    switch ( athlete_type ) {
        case "power":
            let benchPRArray = []
            personalRecords.forEach(record => {
                if(record.id === weight) {
                    benchPRArray = record.bench
                }
            });
            return <Power skills={skills} athlete_weight={weight} 
            benchPRArray={benchPRArray} handlePRUpdate={handlePRUpdate} personalRecords={personalRecords}/>
        case "cali":
            return <Cali />
        case "oly":
            return <Oly />
        case "other":
            return <Other />
        default:
            break;
    }

}

export default Athlete