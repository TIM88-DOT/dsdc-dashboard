import "./index.css";

import { DAppProvider, BSCTestnet } from "@usedapp/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

// IMPORTANT, PLEASE READ
// To avoid disruptions in your app, change this to your own Infura project id.
// https://infura.io/register

const config = {
  readOnlyChainId: BSCTestnet.chainId,
  readOnlyUrls: {
    [BSCTestnet.chainId]: "https://data-seed-prebsc-1-s3.binance.org:8545"
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
