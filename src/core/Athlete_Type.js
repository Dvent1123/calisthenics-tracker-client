import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { isAuth, getCookie, signout} from '../auth/helpers'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Athlete_Type = ({ history}) => {
    const [values, setValues] = useState({
        sex: 'M',
        type: 'power',
        weight: 0, 
        role: '',
        name: '',
        email: '',
        password: '',
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
            console.log('profile values', res)
            const { role, name, email, sex, weight, typeOfAthlete: type } = res.data
            setValues({...values, role, name, email, sex, weight, type})
        })
        .catch(error => {
            console.log('profile loading error', error)
            if(error === 401) {
                signout(() => {
                    history.push('/')
                })
            }
        })
    }

    const { sex, type, weight } = values

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/athlete`,
            data:  { sex, weight, type } ,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            isAuth() && isAuth.role === 'admin' ? history.push('/admin') : history.push('/home')
        })
        .catch(err => {
            console.log(err.response.data)
            toast.error(err.response.data.error)
        })
    }

    const athleteForm = () => {
        return (<form className='form1'>
            <div className='input-container'>
                <label>Sex</label>
                <label>
                    <input className='input' onChange={handleChange('sex')} value='M' checked={sex === 'M'} type='radio'/>
                    Male
                </label>
                <label>
                    <input className='input' onChange={handleChange('sex')} value='F' checked={sex === 'F'} type='radio'/>
                    Female
                </label>
            </div>
            <div className='input-container'>
                    <label>Athlete Type</label>
                    <label>
                        <input className='input' onChange={handleChange('type')} value='power' checked={type === 'power'} type='radio'/>
                        Powerlifter
                    </label>
                    <label>
                        <input className='input' onChange={handleChange('type')} value='oly' checked={type === 'oly'} type='radio'/>
                        Olympic Lifter
                    </label>
                    <label>
                        <input className='input' onChange={handleChange('type')} value='cali' checked={type === 'cali'} type='radio'/>
                        Calisthenics
                    </label>
                    <label>
                        <input className='input' onChange={handleChange('type')} value='other' checked={type === 'other'} type='radio'/>
                        Other
                    </label>
            </div>
            <div className="input-container">
                <label htmlFor="weight">Weight</label>
                <input type="number" id="weight" name="weight" onChange={handleChange('weight')} value={weight}/>
            </div>
            <div className='button-container'>
                <button className='submit' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </form>)
    }
    
    return (
        <Layout>
            <div className='signin-main'>
                <ToastContainer />
                {athleteForm()}
            </div>
        </Layout>
    );
}

export default Athlete_Type