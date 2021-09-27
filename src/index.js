import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Initialize Firebase
const app = initializeApp({
  apiKey: 'AIzaSyBfqNC19oYF0fjlnyLCUHWMF2weRtGao_I',
  authDomain: 'fire-d83f5.firebaseapp.com',
  projectId: 'fire-d83f5',
  storageBucket: 'fire-d83f5.appspot.com',
  messagingSenderId: '172859994264',
  appId: '1:172859994264:web:2ee859448e1b6444f1a0ed',
  measurementId: 'G-0JNN96M8KL'
});
getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
