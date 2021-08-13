import React, { useState } from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {authenticate, isAuth } from './helpers';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = ({ history }) => {
    const [values, setValues] = useState({
        name: 'First & Last Name',
        email: 'Email',
        password: 'Password',
        buttonText: 'Submit'
    });

    const { name, email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: { name, email, password }
        })
            .then(response => {
                console.log('SIGNUP SUCCESS', response);
                authenticate(response, () => {
                    setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
                    isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/athlete_type');
                })
                // setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                // toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNUP ERROR', error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signupForm = () => (
        <form className='form2'>
            <div className='input-container'>
                <label>Name</label>
                <input className='input' onChange={handleChange('name')} value={name} type="text" />
            </div>

            <div className='input-container'>
                <label>Email</label>
                <input className='input' onChange={handleChange('email')} value={email} type="email" />
            </div>

            <div className='input-container'>
                <label>Password</label>
                <input className='input' onChange={handleChange('password')} value={password} type="password" />
            </div>

            <div className='button-container'>
                <button className='submit' onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );


    return (
        <Layout>
            <div className='signin-main'>
                <ToastContainer />
                {/* {isAuth() ? <Redirect to="/" /> : null} */}
                <h1 className='signin'>Signup</h1>
                {signupForm()}
            </div>
        </Layout>
)}

export default Signup