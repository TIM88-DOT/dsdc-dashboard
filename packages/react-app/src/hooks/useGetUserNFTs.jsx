import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useAccount, useContractRead } from "wagmi";

const useGetUserNFTs = (plan) => {
  const { address } = useAccount();
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

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: plan === 1 ? 'tokensOfOwner' : 'walletOfOwner',
    args: [address],
    watch: true
  })
  if (isError) {
    console.error("error getting walletOfOwner");
    return undefined;
  }

  return data?.map(e => e.toString());


};

export default useGetUserNFTs;