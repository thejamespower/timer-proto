import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import Shell from './components/Shell';
import * as serviceWorker from './serviceWorker';

const startApp = () => {
  serviceWorker.register();
  ReactDOM.render(<Shell />, document.getElementById('root'));
};

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
