import { ethers } from "ethers";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { fetchSigner } from '@wagmi/core'

const setApprovalForAll = async (plan) => {
        const signer = await fetchSigner();

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
            contractAddress = addresses.mutants
            contractAbi = abis.mutants
            break
          default:
            break;
        }

        const tokenContract = new ethers.Contract(contractAddress, contractAbi, signer) 

        const tx = await tokenContract.setApprovalForAll(addresses.staking, 1);
        await tx.wait()

   

};

export default setApprovalForAll;