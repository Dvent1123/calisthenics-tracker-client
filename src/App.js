import React from 'react'
import Layout from './core/Layout'
import { Link } from 'react-router-dom'
import arm from './assets/images/arm.svg'
import graph from './assets/images/graph.svg'
import joints from './assets/images/joints.svg'

const App = () => {
  return ( 
      <Layout>
        <div className='whole-landing-page-container'>
          <div className='landing-page-container'>
            <h3 className='app-title'>3 Skills to Master Before I Die</h3>
            <h1 className="index-header">Skills Tracking</h1>
            <p className='index-words'>See where you are in your Calisthenics journey with our interactive Calisthenics map. </p>
            <div className="banner" align="center">
              <div className="signup_banner"> 
            <br/>
            <Link to="/signup">
            <button className='landing-page-start'>                    
              <li>
                  Sign Up
              </li>
            </button>
            </Link>
            <br/>
            <Link to="/signin">
            <button className='landing-page-signin'>
              <li>
                  Sign In
              </li>
            </button>
            </Link>
            <br/> <br/>
            </div>
            </div>
          </div>
          <div className='landing-page-header'>
          {/* spacer */}
            <h2>
              Why Calisthenics?
            </h2>
            <div className="divider div-transparent div-arrow-down"></div>
          </div>
          <div className='card-container'>
            <div className="card">

              <div className="title">Increase Strength</div>

              <div className="icon">
                <img src={graph} alt='graph' className='card-icons'/>
              </div> 

              <div className="features">
                <p>
                  Calisthenics inovlves compound exercises performed with your body
                  which allow for improved bodyweight strength. Combined with weighted
                  calisthenics you can take your strength to the next level.
                </p>
              </div>
            </div>
            <div className="card">

              <div className="title">Build Muscle</div>

              <div className="icon">
                <img src={arm} alt='bicep' className='card-icons'/>
              </div>

              <div className="features">
                <p>
                  Hypertrophy through calisthenics is more than possible and with
                  calisthenics tools such as rings, parallettes, and bands you can 
                  build an impressive physique with calisthenics alone.
                </p>
              </div>
            </div>
            <div className="card">

              <div className="title">Improve Tendon and Joint Health</div>

              <div className="icon">
                <img src={joints} alt='knee' className='card-icons'/>
              </div>

              <div className="features">
                <p>
                  Calisthenics allows for a greater range of motion within
                  exercises which increase tendon and joint strength. These movements
                  also require high amounts of balance and control to improve your overall performance.
                </p>
              </div>
            </div>                        
          </div>
        </div>
      </Layout>

    )
}

export default App;
