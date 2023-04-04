import "./index.css";

import { DAppProvider, BSC } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

// IMPORTANT, PLEASE READ
// To avoid disruptions in your app, change this to your own Infura project id.
// https://infura.io/register

const config = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: "https://bsc-dataseed.binance.org"
  },
}


ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
