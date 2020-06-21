import React from 'react';
import logo from './react.svg';

import { MotionScene, SharedElement, MotionScreen } from 'react-motion-layout';

// import './Home.css';
import Hello from './components/Hello/Hello';

class Home extends React.Component<{}, {}> {
  public render() {
    return (
      <MotionScreen>
        <MotionScene easing="cubic-bezier(0.22, 1, 0.36, 1)" name={`cardListScene`}>
          <div className="Home">
            <div className="Home-header">
              <img src={logo} className="Home-logo" alt="logo" />
              <h2>Welcome to Razzles</h2>
            </div>
            <p className="Home-intro">
              <Hello />
            </p>
          </div>
          <SharedElement.Text animationKey="card">Test</SharedElement.Text>
        </MotionScene>
      </MotionScreen>
    );
  }
}

export default Home;
