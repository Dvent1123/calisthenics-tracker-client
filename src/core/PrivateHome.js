import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { isAuth, getCookie, signout} from '../auth/helpers'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Athlete from '../helpers/Athlete'

const PrivateHome = ({ history }) => {
    const [exerciseData, setExerciseData] = useState(null)

    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        typeOfAthlete: '',
        weight: 0,
        sex: 'M',
        personalRecords: [],
        buttonText: 'Submit'
    })

    const token = getCookie('token')

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('private profile', res)
            const { role, name, email, exercises, typeOfAthlete, weight, personalRecords, sex } = res.data
            setValues({role, name, email, typeOfAthlete, weight, personalRecords, sex})
            //function to filter out exercises based on athlete type
            let athleteExercises = filteredSkillArrayByAthlete(exercises, typeOfAthlete)
            setExerciseData(athleteExercises)
            console.log('these are the exercises: ' + exercises[0].exercise)
        })
        .catch(error => {
            console.log('private profile error', error)
            if(error === 401) {
                signout(() => {
                    history.push('/')
                })
            }
        })
    }

    const { name, typeOfAthlete, weight, personalRecords, sex } = values

    const handleSkillUnlock = (skillID, unlockedSkill) => {
        let unlockedSkillsArray = updatedSkillArray(exerciseData, skillID, unlockedSkill)

        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/unlock`,
            data:  unlockedSkillsArray ,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('skill unlock success', res)
            setValues({ ...values, buttonText: 'Submitted'})
            toast.success('Skill unlocked!')
        })
        .catch(err => {
            console.log(err.response.data)
            setValues({ ...values, buttonText: 'Submit'})
            toast.error(err.response.data.error)
        })
    }



    const handlePRUpdate = (prArray, newPR, oldPRArray, weight, exercise) => {
        let updatedPersonalRecordsArray = updatePersonalRecordsArray(prArray, newPR, oldPRArray, weight, exercise)

        console.log('This is the new UpdatedArray', updatedPersonalRecordsArray)
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/prupdate`,
            data:  updatedPersonalRecordsArray ,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            console.log('New PR!', res)
            toast.success('New PR!')
        })
        .catch(err => {
            console.log(err.response.data)
            toast.error(err.response.data.error)
        })
    }


    // prArray is array of pr's, ie bench array for 165 weight class
    // newPR is used to unlock in prArray
    // oldPRArray is the entire personalRecords array from model
    // weight is just weight
    const updatePersonalRecordsArray = (prArray, newPR, oldPRArray, weight, exercise) => {
        // updates prArray, ie bench PR array
        switch (exercise) {
            case "bench":  
                    prArray.forEach( pr => {
                        if( pr.benchWeight === newPR) {
                            pr.locked = false
                        }
                    })

                    // updates old personalRecords array using weight class
                    oldPRArray.forEach(record => {
                        if(record.id === weight) {
                            record.bench = prArray
                        }
                    });
                break;
            case "squat":
                    prArray.forEach( pr => {
                        if( pr.squatWeight === newPR) {
                            pr.locked = false
                        }
                    })

                    // updates old personalRecords array using weight class
                    oldPRArray.forEach(record => {
                        if(record.id === weight) {
                            record.squat = prArray
                        }
                    });
                break;
            case "deadlift":
                    prArray.forEach( pr => {
                        if( pr.deadliftWeight === newPR) {
                            pr.locked = false
                        }
                    })

                    // updates old personalRecords array using weight class
                    oldPRArray.forEach(record => {
                        if(record.id === weight) {
                            record.deadlift = prArray
                        }
                    });
                break;
            default:
                break;
        }

        return oldPRArray
    }

    const filteredSkillArrayByAthlete = (exerciseArray, athleteType) => {
        let filteredArray = exerciseArray.filter(skill => {
            return skill.category === athleteType
        })

        return filteredArray
    }

    //takes in current skill array and id of skill we want to unlock
    const updatedSkillArray = (currentArray, skillID, unlockedSkill) => {
        let removedSkillArray = currentArray.filter(skill => {
            return skill.id !== skillID
        })

        removedSkillArray.splice(unlockedSkill.id, 0, unlockedSkill)
        console.log(removedSkillArray)
        return removedSkillArray
    }

    return (
        <Layout>
            <div className='title-header'>
                <h1 className='welcome'> Hello 
                <span className='welcome-name'> {name} </span>
                </h1>
            </div>
            <ToastContainer />
            <div className='card-container'>
                {
                    typeOfAthlete ?
                    <Athlete athlete_type={typeOfAthlete} skills={exerciseData} 
                    personalRecords={personalRecords} weight={weight} sex={sex}
                    handlePRUpdate={handlePRUpdate}
                    handleSkillUnlock={handleSkillUnlock}/> :
                    <div><h1>Loading...</h1></div>                
                }

             </div>
        </Layout>
    )
}

export default PrivateHome