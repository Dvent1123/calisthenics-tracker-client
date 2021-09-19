import React from 'react'
import useToggleCard from '../helpers/ToggleCard'
import Popup from 'reactjs-popup'
import planche from '../assets/images/exercises/planche.svg'
import fl from '../assets/images/exercises/front_lever.svg'
import pu from '../assets/images/exercises/pullup.svg'
import lock from '../assets/images/lock.svg'
import a_tuck_planche from '../assets/images/exercises/advanced_tuck_planche.svg'
import back_lever from '../assets/images/exercises/back_lever.svg'
import bench from '../assets/images/exercises/bench.svg'
import bw_squat from '../assets/images/exercises/bw_squat.svg'
import chinup from '../assets/images/exercises/chinup.svg'
import clap_pullup from '../assets/images/exercises/clap_pullup.svg'
import c_and_j from '../assets/images/exercises/clean_and_jerk.svg'
import deadlift from '../assets/images/exercises/deadlift.svg'
import dips from '../assets/images/exercises/dips.svg'
import frog_stand from '../assets/images/exercises/dips.svg'
import front_squat from '../assets/images/exercises/front_squat.svg'
import glute_bridge from '../assets/images/exercises/glute_bridge.svg'
import handstand from '../assets/images/exercises/glute_bridge.svg'
import hs_pushup from '../assets/images/exercises/hs_pushup.svg'
import human_flag from '../assets/images/exercises/human_flag.svg'
import iron_cross from '../assets/images/exercises/iron_cross.svg'
import l_sit from '../assets/images/exercises/l_sit.svg'
import maltese from '../assets/images/exercises/maltese.svg'
import manna from '../assets/images/exercises/muscle_up.svg'
import muscle_up from '../assets/images/exercises/muscle_up.svg'
import nordic_curls from '../assets/images/exercises/nordic_curls.svg'
import pike_pushups from '../assets/images/exercises/pike_pushups.svg'
import pistol_squats from '../assets/images/exercises/pistol_squat.svg'
import press_to_hs from '../assets/images/exercises/press_to_hs.svg'
import pullover from '../assets/images/exercises/pullover.svg'
import pushup from '../assets/images/exercises/pushup.svg'
import ring_pushup from '../assets/images/exercises/ring_pushup.svg'
import skin_the_cat from '../assets/images/exercises/skin_the_cat.svg'
import snatch from '../assets/images/exercises/snatch.svg'
import tuck_fl from '../assets/images/exercises/tuck_fl.svg'
import unlock from '../assets/images/unlock.svg'

const images = [planche, fl, pu, pullover,
                chinup,clap_pullup,iron_cross,
                frog_stand,a_tuck_planche,
                pushup, ring_pushup, maltese,
                dips, muscle_up, human_flag,
                bw_squat, pistol_squats,
                nordic_curls, glute_bridge,
                bench, front_squat,deadlift,
                snatch, c_and_j, handstand,
                hs_pushup, pike_pushups,
                press_to_hs, l_sit, manna,
                skin_the_cat, back_lever,
                tuck_fl]

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

export default Card