import { Contract } from "@ethersproject/contracts";
import { useCall } from "@usedapp/core";

export function useGetIsApprovedForAll(
  contractAddress,
  contractAbi,
  stakingAddress,
  address
) {
  const { value, error } =
    useCall(
      address &&
        contractAddress && {
          contract: new Contract(contractAddress, contractAbi), // instance of called contract
          method: "isApprovedForAll", // Method to be called
          args: [address, stakingAddress], // Method arguments - address to be checked for balance
        }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  
  return value?.[0];
}
