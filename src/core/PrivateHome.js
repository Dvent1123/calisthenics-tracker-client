import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { isAuth, getCookie, signout} from '../auth/helpers'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Card from '../core/Card'

const PrivateHome = ({ history}) => {
    const [exerciseData, setExerciseData] = useState(null)

    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
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
            const { role, name, email, exercises } = res.data
            setValues({role, name, email})
            setExerciseData(exercises)
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

    const { role, name, email, buttonText } = values

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

    //takes in current skill array and id of skill we want to unlock
    const updatedSkillArray = (currentArray, skillID, unlockedSkill) => {
        let removedSkillArray = currentArray.filter(skill => {
            return skill.id != skillID
        })

        removedSkillArray.splice(unlockedSkill.id, 0, unlockedSkill)

        return removedSkillArray
    }

    return (
        <Layout>
            <div className='title-header'>
                <h1 className='welcome'>Welcome Back<span className='welcome-name'> {name}</span>
                    </h1>
            </div>
            <ToastContainer />
            <div className='card-container'>
            {
                exerciseData ? 
                exerciseData.map((skill) => {
                    return <Card key={skill.id} skill={skill} handleSkillUnlock={handleSkillUnlock}/>
                }) : 
                    <div><h1>Loading...</h1></div>                
            }
             </div>
        </Layout>
    )
}

export default PrivateHome