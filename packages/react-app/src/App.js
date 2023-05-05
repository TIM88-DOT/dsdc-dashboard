import React, { useEffect } from "react";
import { Container } from "./components";
import Dashboard from "./components/Dashboard";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'

import StickyFooter from './components/StickyFooter'

function App() {
  const chains = [bscTestnet]
  const projectId = '55ce67f74172a4fdea4813ac99488323'

  const { provider } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider
  })
  const ethereumClient = new EthereumClient(wagmiClient, chains)
  
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Container>
          <Dashboard />
        {/* <StickyFooter /> */}

        </Container>

        <Web3Modal themeVariables={{
            '--w3m-background-color': '#bfc500',
            '--w3m-accent-color': '#bfc500'
          }} projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </>
  );
}

export default App;
