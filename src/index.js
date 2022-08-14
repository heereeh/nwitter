import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import firebase from "fBase"

// https://velog.io/@seondal/Firebase-v9%EB%B6%80%ED%84%B0-%EB%8B%AC%EB%9D%BC%EC%A7%84-%EC%9D%B8%EC%A6%9D%EB%AA%A8%EB%93%88-%EC%82%AC%EC%9A%A9%EB%B2%95

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);