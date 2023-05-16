import { useState, useEffect, useMemo, useCallback } from "react";
import { useContractRead } from 'wagmi'
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useAccount } from "wagmi";
import getNftsData from "../helpers/getNftsData";

const useGetStakedNFTs = (plan) => {

  const [stakedNftsValue, setStakedNftsValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();

  const { data, isError, error } = useContractRead({
    address: addresses.staking,
    abi: abis.staking,
    functionName: 'getStakedTokens',
    args: [plan, address],
    watch: true
  })
  if (isError) {
    console.error("error getting Staked Tokens", error);
  }

  const getData = useCallback(async () => {
    setIsLoading(true);

    const tokenData = await getNftsData(plan, data.map((e) => Number(e)));
    setStakedNftsValue(tokenData);
    setIsLoading(false);
  }, [data, plan]);


  useEffect(() => {
    getData();
  }, [getData, data]);

  return { isLoading, stakedNftsValue };
};

export default useGetStakedNFTs;
