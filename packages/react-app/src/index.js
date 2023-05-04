import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

// IMPORTANT, PLEASE READ
// To avoid disruptions in your app, change this to your own Infura project id.
// https://infura.io/register

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </React.StrictMode>
);
