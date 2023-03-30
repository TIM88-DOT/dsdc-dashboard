import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useEthers } from "@usedapp/core";
import useGetStakedNFTs from "./useGetStakedNFTs";

const useGetTotalRewards = (plan) => {
  const [totalRewards, setTotalRewards] = useState();
  const { account } = useEthers();
  const stakedNftsValue = useGetStakedNFTs(plan);
  useEffect(() => {
    const getTotalRewards = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://data-seed-prebsc-1-s3.binance.org:8545"
        );
        const contract = new ethers.Contract(
          addresses.staking,
          abis.staking,
          provider
        );
        const totalRewardsValue = await contract.getEarnedRewards(
          plan,
          account
        );
        setTotalRewards(totalRewardsValue);
      } catch (error) {
        console.error(error);
      }
    };

    getTotalRewards();
  }, [account, plan, totalRewards, stakedNftsValue]);

  return totalRewards;
};

export default useGetTotalRewards;
