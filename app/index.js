import React from 'react';
import ReactDOM from 'react-dom';
// require('./index.css');
import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// class App extends React.Component {
//     render(){
//         return(
//             <div>
//                 <h1>Howdy from React!</h1>
//             </div>
//         )
//     }
// }

// ReactDOM.render(<App />, document.getElementById('app'));