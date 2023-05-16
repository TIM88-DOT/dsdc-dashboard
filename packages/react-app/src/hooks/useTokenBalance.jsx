import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useContractRead, useAccount } from 'wagmi'
export function useTokenBalance(
) {

  const { address } = useAccount();

  const { data, isError, error } = useContractRead({
    address: addresses.stink,
    abi: abis.stink,
    functionName: 'balanceOf',
    args: [address],
    watch: true
  })
  if (isError) {
    console.error("error getting token balance", error);
    return undefined;
  }

  return data;
}