import React, {Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {isAuth, signout} from '../auth/helpers'
import { FaAlignRight } from 'react-icons/fa'
import useToggle from '../helpers/Toggle'

const Layout = ({children, match, history}) => {
    const [isOn, toggleIsOn] = useToggle()

    const isActive = path => {
        console.log(match.path)
        if(match.path === path) {
            return {color: '#01BAEF'}
        }else {
            return {color: '#fff'}
        }
    }

    const nav = () => {
        return (
        <ul className={isOn ? "nav-links show-nav" : "nav-links"}>
            <li className='nav-link'>
                <Link to="/" style={isActive('/')}>
                    Home
                </Link>
            </li>

        {!isAuth() && (
            <Fragment>
                <li>
                    <Link to="/signup" style={isActive('/signup')}>
                        Sign Up
                    </Link>
                </li>
                <li className='nav-link'>
                    
                    <Link to="/signin" style={isActive('/signin')}>
                        Sign In
                    </Link>
                </li>
            </Fragment>
        )}

        {isAuth() && isAuth().role === 'admin' && (
            <Fragment>
                <li>
                    <Link style={isActive('/home')} to="/home">
                        {isAuth().name}
                    </Link>
                </li>                   
                <li>
                    <Link style={isActive('/admin')} to="/admin">
                        Settings
                    </Link>
                </li>
            </Fragment>
        )}

        {isAuth() && isAuth().role === 'subscriber' && (
            <Fragment>
                <li>
                    <Link style={isActive('/home')} to="/home">
                        {isAuth().name}
                    </Link>
                </li>                   
                <li>
                    <Link style={isActive('/private')} to="/private">
                        Settings
                    </Link>
                </li>
                <li>
                    <Link style={isActive('/athlete_type')} to="/athlete_type">
                        Athlete Settings
                    </Link>
                </li>       
            </Fragment>
        )}


        {isAuth() && (
            <li>
                <span
                    style={{ cursor: 'pointer', color: '#fff' }}
                    onClick={() => {
                        signout(() => {
                            history.push('/');
                        });
                    }}
                >
                    Sign Out
                </span>
            </li>
        )}

    </ul>
    )
}

    return (<Fragment>
        <div className="navBar">
            <button className="hamburger-btn" onClick={toggleIsOn}>
                <FaAlignRight />
            </button>
            {nav()}
        </div> 
        <div className="wrapper">
            <div className="container">
                {children}
            </div>
        </div>
    </Fragment>)
}

export default withRouter(Layout)