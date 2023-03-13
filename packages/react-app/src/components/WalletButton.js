import { Button } from "../components";
import { Mumbai, shortenAddress, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default function WalletButton() {
  const [rendered, setRendered] = useState("");

  const { ens } = useLookupAddress();
  const { account, activate, deactivate, switchNetwork, error, chainId } = useEthers();

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          chainId: 8001,
          rpc: {
            8001: "https://matic-mumbai.chainstacklabs.com",
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (chainId !== Mumbai.chainId) {
      switchNetwork(Mumbai.chainId)
    }
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [chainId, error, switchNetwork]);

  return (
    <Button
      onClick={() => {
        if (!account) {
          activateProvider();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}