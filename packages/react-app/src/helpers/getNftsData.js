import axios from "axios";
import { getIpfsUrls } from "./getIpfsUrls";


async function getNftsData(plan, userNfts ) {
    const tokenData = [];
    const ipfsUrls = await getIpfsUrls();
    let metadataUri;
    switch (plan) {
      case 0:
        metadataUri = ipfsUrls.ogDsdc;
        break;
      case 1:
        metadataUri = ipfsUrls.mutants;
        break;
      case 2:
        metadataUri = ipfsUrls.ssss;
        break
      default:
        break;
    }
    for (var j = 0; j < userNfts?.length; j++) {
      const metadata = await axios.get(
        metadataUri + userNfts[j] + '.json'
      );
      const nftTokenData = {
        img: `https://drunkskunksdc.mypinata.cloud/ipfs/${metadata.data.image.slice(
          7
        )}`,
        title: plan === 1 ? `DSDC Mutant #${userNfts[j]}` : metadata.data.name,
        tokenId: userNfts[j],
      };
      tokenData.push(nftTokenData);
    }


    return tokenData;
  }

  export default getNftsData;