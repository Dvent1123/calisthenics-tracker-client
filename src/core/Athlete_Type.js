import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios'
import { isAuth, getCookie, signout} from '../auth/helpers'
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import Card from '../core/Card'

const Athlete_Type = ({ history}) => {

    const [values, setValues] = useState({
        sex: 'M',
        type: 'power',
    })

    const {sex, type} = values

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    // const clickSubmit = event => {
    //     event.preventDefault()
    //     setValues({...values, buttonText: 'Submittin'})
    //     axios({
    //         method: 'POST',
    //         url: `${process.env.REACT_APP_API}/signin`,
    //         data: { email, password}
    //     })
    //     .then(res => {
    //         console.log('signin success', res)
    //         authenticate(res, () => {
    //             setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
    //             isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/home');
    //         })
    //     })
    //     .catch(error => {
    //         console.log('signin error', error.response.data)
    //         setValues({...values, buttonText: 'Submit'})
    //         toast.error(error.response.data.error)
    //     })
    // }

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
            <div className='button-container'>
                <button className='submit'>
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