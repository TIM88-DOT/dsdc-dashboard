import { useContractRead } from 'wagmi'
import { addresses, abis } from "@uniswap-v2-app/contracts";

export function useGetIsApprovedForAll(
  plan,
  address
) {
  let contractAddress;
  let contractAbi;
  switch (plan) {
    case 0:
      contractAddress = addresses.dsdc;
      contractAbi = abis.dsdc;
      break;
    case 1:
      contractAddress = addresses.mutants
      contractAbi = abis.mutants
      break;
    case 2:
      contractAddress = addresses.stoned
      contractAbi = abis.stoned
      break
    default:
      break;
  }

  const { data, isError, error } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'isApprovedForAll',
    args: [address, addresses.staking],
    watch: true
  })
  if (isError) {
    console.error("error getting isApprovedForAll", error);
    return undefined;
  }

  return data;
}
