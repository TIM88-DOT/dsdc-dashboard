import { Button } from "../components";
import React, { useEffect, useState } from "react";

import { useWeb3Modal } from "@web3modal/react";

import { useAccount, useDisconnect, useEnsName, useNetwork, useSwitchNetwork } from "wagmi";

import getWalletShort from '../helpers/getWalletShort';

export default function WalletButton() {

  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()

  const { chain } = useNetwork()
	const { chains, error, isLoading, pendingChainId, switchNetwork } =
		useSwitchNetwork()


  const label = (address !== '' && address !== undefined) ? (ensName ?? getWalletShort(address)) : "CONNECT WALLET";


  const onConnectClick = async () => {
    if (!isConnected) {
      open();
    } else {
      disconnect();
    }

  };


	useEffect(() => {
		if (chain?.id !== chains[0]?.id) {
			switchNetwork?.(chains[0]?.id)
		}
		if (error) {
			console.error("Error while connecting wallet:", error.message);
		}
	}, [chain, chains, error, switchNetwork]);

  return (
    <Button
      onClick={onConnectClick()}
    >
      {isLoading && pendingChainId === chains[0]?.id ? 'SWITCHING NETWORK...' : label}
    </Button>
  );
}