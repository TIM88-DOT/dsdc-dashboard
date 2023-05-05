import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useAccount } from "wagmi";

const useGetUserNFTs = (plan) => {
  const [ids, setIds] = useState([]);
  const { address } = useAccount();
  useEffect(() => {
    const fetchIds = async () => {
      let contract = null
      let ids = [];
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://data-seed-prebsc-1-s2.binance.org:8545"
        );

        if (plan === 1) {
          contract = new ethers.Contract(addresses.mutants, abis.mutants, provider);
          //ids = await contract.tokensOfOwner(address);
          ids = await contract.walletOfOwner(address);
        } else if(plan === 0) {
          contract = new ethers.Contract(addresses.dsdc, abis.dsdc, provider);
          ids = await contract.walletOfOwner(address);
        } else {
          // replace for stoners
          contract = new ethers.Contract(addresses.mutants, abis.mutants, provider);
          ids = await contract.walletOfOwner(address);
        }

        setIds(ids);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIds();
  }, [address]);

  return ids.map(e => e.toString());
};

export default useGetUserNFTs;