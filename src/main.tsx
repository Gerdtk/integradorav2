import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


import './lib/firebase'; //base de datos en la nube.


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

