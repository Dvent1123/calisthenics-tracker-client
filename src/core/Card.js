import React from 'react'
import useToggleCard from '../helpers/ToggleCard'
import Popup from 'reactjs-popup'
import planche from '../assets/images/plancheFinal.svg'
import fl from '../assets/images/frontleverFinal.svg'
import pu from '../assets/images/pullupFinal.svg'
import lock from '../assets/images/lock.svg'
import unlock from '../assets/images/unlock.svg'

const images = [planche, fl, pu]

const Card = ({skill, handleSkillUnlock}) => {
    const {id, exercise, locked, diff, desc, img} = skill
    const [isOn, toggleIsOn] = useToggleCard(locked)
    const unlockSkill = {
        id: id,
        exercise: exercise,
        locked: false,
        diff: diff,
        desc: desc,
        img: img
    }

    return (
    <div className='full-card'>
        <div className="center">
        {
            isOn ?            
            <div className='property-card'>
                    <div className='lock'>
                        <img alt='lock' className='lock-image' src={lock} />
                        <h4 className='skill-title'> {exercise} </h4>                
                    </div> 
                    <div className='property-description'>
                        <h5>Difficulty: {diff}</h5>
                        <p>{desc}.</p>
                    </div>
                </div> :
                <div className="property-card">
                    <div className='lock'>
                        <img alt='unlock' className='lock-image' src={unlock} />                
                    </div>
                    <div className='property-image'>
                        <img alt='skill' className='skill-image' src={images[id]} />
                    </div>
                </div>
            }
            </div>
            <div className='btn-container'>
                <Popup trigger={
                    <button className={isOn ? "unlock-btn" : "unlock-btn show-unlock"}>
                        Unlock
                    </button>} modal>
                        {close => (
                        <div className="modal">
                            <button className="close" onClick={close}>
                            &times;
                            </button>
                            <div className="header">
                                <h2 className='warning-header'>Warning!</h2>
                                 Are you sure you've mastered this skill? Once you unlock it you will not be able to lock it! </div>
                            <div className="actions">
                                <button
                                    className="submit"
                                    onClick={() => {
                                    toggleIsOn();
                                    close()
                                    handleSkillUnlock(id, unlockSkill)
                                    }}
                                >
                                    Unlock
                                </button>
                                <button
                                    className="close-btn"
                                    onClick={() => {
                                    close();
                                    }}
                                >
                                    Close Modal
                                </button>
                        </div>
                    </div>
                    )}
                </Popup>
            </div>
        </div>
    )
}

export default Card