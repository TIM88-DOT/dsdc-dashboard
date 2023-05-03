import { ethers } from "ethers";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { fetchSigner } from '@wagmi/core'

const setApprovalForAll = async (mutants) => {
        const signer = await fetchSigner();

        const tokenContract = mutants ? new ethers.Contract(addresses.mutants, abis.mutants, signer) :
            new ethers.Contract(addresses.dsdc, abis.dsdc, signer)

        const tx = await tokenContract.setApprovalForAll(addresses.staking, 1);
        await tx.wait()

   

};

export default setApprovalForAll;