import { useCall, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import { addresses, abis } from "@uniswap-v2-app/contracts";
export function useTokenBalance(
  ) {
    const { account } = useEthers();
    const { value, error } =
      useCall(
        account &&
       {
            contract: new Contract( addresses.stink, abis.stink), // instance of called contract
            method: "balanceOf", // Method to be called
            args: [account], // Method arguments - address to be checked for balance
          }
      ) ?? {};
    if(error) {
      console.error(error.message)
      return undefined
    }
    return value?.[0]
  }