import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { useCall } from "@usedapp/core";
import React, { useEffect } from "react";

import { Container} from "./components";

import Dashboard from "./components/Dashboard";
import { MAINNET_ID, addresses, abis } from "@uniswap-v2-app/contracts";
import GET_AGGREGATED_UNISWAP_DATA from "./graphql/subgraph";


function App() {
  // Read more about useDapp on https://usedapp.io/
  const { error: contractCallError, value: reserves } =
    useCall({
      contract: new Contract(addresses[MAINNET_ID].pairs["DAI-WETH"], abis.pair),
      method: "getReserves",
      args: [],
    }) ?? {};

  const { loading, error: subgraphQueryError, data } = useQuery(GET_AGGREGATED_UNISWAP_DATA);

  useEffect(() => {
    if (subgraphQueryError) {
      console.error("Error while querying subgraph:", subgraphQueryError.message);
      return;
    }
    if (!loading && data && data.uniswapFactories) {
      console.log({ uniswapFactories: data.uniswapFactories });
    }
  }, [loading, subgraphQueryError, data]);

  return (
    <Container>
      <Dashboard />
    </Container>
  );
}

export default App;
