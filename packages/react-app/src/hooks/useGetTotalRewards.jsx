import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useContractRead, useAccount } from 'wagmi'

const useGetTotalRewards = (plan) => {
  const { address } = useAccount();

  const { data, isError, isLoading } = useContractRead({
    address: addresses.staking,
    abi: abis.staking,
    functionName: 'getEarnedRewards',
    args: [plan, address],
    watch: true
  })
  if (isError) {
    console.error("error getting earned rewards");
    return undefined;
  }
  return data;
};

export default useGetTotalRewards;
