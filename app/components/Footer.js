import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        intervalId: 0
    };
  }
  
  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <div>
        <ul className ='footer'>
          <li><a onClick={ () => { this.scrollToTop(); }}>Back To Top</a></li>
          <li>About </li>
          <li>FAQ</li>
        </ul>
      </div>
    )
  }
}

module.exports = Footer;