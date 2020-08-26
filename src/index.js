import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

ReactDOM.render(<App/>,document.getElementById("root"));