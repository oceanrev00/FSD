import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';

import '@fontsource/inter/300.css';   // light
import '@fontsource/inter/400.css';   // regular (most used)
import '@fontsource/inter/500.css';   // medium
import '@fontsource/inter/600.css';   // semi-bold
import '@fontsource/inter/700.css';   // bold

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </React.StrictMode>
);