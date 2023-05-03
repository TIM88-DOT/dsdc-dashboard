import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useAccount } from "wagmi";
import useGetStakedNFTs from "./useGetStakedNFTs";

const useGetTotalRewards = (plan) => {
  const [totalRewards, setTotalRewards] = useState();
  const { address } = useAccount();
  const stakedNftsValue = useGetStakedNFTs(plan);
  useEffect(() => {
    const getTotalRewards = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://data-seed-prebsc-1-s2.binance.org:8545"
        );
        const contract = new ethers.Contract(
          addresses.staking,
          abis.staking,
          provider
        );
        const totalRewardsValue = await contract.getEarnedRewards(
          plan,
          address
        );
        setTotalRewards(totalRewardsValue);
      } catch (error) {
        console.error(error);
      }
    };

    getTotalRewards();
  }, [address, plan, totalRewards, stakedNftsValue]);

  return totalRewards;
};

export default useGetTotalRewards;
