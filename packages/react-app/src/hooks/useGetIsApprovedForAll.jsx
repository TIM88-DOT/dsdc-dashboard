import { useContractRead } from 'wagmi'

export function useGetIsApprovedForAll(
  contractAddress,
  contractAbi,
  stakingAddress,
  address
) {

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'isApprovedForAll',
    args: [address, stakingAddress],
    watch: true
  })
  if (isError) {
    console.error("error getting isApprovedForAll");
    return undefined;
  }

  return data;
}
