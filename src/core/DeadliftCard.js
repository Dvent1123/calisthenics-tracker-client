import React from 'react'
import useToggleCard from '../helpers/ToggleCard'
import Popup from 'reactjs-popup'
import unlock from '../assets/images/unlock.svg'
import deadlift from '../assets/images/exercises/deadlift.svg'
import lock from '../assets/images/lock.svg'

const DeadliftCard = ({ deadliftWeights, personalRecords, handlePRUpdate, weight, deadliftArray}) => {
    const { deadliftWeight, locked } = deadliftWeights
    const [isOn, toggleIsOn] = useToggleCard(locked)
    const exercise = "deadlift"

    return (
    <div className='full-card'>
        <div className="center">
        {
            isOn ?            
            <div className='property-card'>
                    <div className='lock'>
                        <img alt='lock' className='lock-image' src={lock} />
                        <h4 className='skill-title'> {deadliftWeight} </h4>                
                    </div> 
                </div> :
                <div className="property-card">
                    <div className='lock'>
                        <img alt='unlock' className='lock-image' src={unlock} />                
                    </div>
                    <div className='property-image'>
                        <img alt='skill' className='skill-image' src={deadlift} />
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
                                        handlePRUpdate(deadliftArray, deadliftWeight, personalRecords, weight, exercise)
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
                                    Close Workout
                                </button>
                        </div>
                    </div>
                    )}
                </Popup>
            </div>
        </div>
    )
}

export default DeadliftCard