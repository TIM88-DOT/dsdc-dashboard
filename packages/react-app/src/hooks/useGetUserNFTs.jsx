import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useEthers } from "@usedapp/core";

const useGetUserNFTs = (mutants) => {
  const [ids, setIds] = useState([]);
  const { account } = useEthers();
  useEffect(() => {
    const fetchIds = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://data-seed-prebsc-1-s3.binance.org:8545"
        );
        let contract = new ethers.Contract(addresses.dsdc, abis.dsdc, provider);
        if (mutants) {
          contract = new ethers.Contract(addresses.mutants, abis.mutants, provider);
        }
        const ids = await contract.walletOfOwner(account);
        setIds(ids);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIds();
  }, [account, mutants]);

  return ids.map(e => e.toString());
};

export default useGetUserNFTs;