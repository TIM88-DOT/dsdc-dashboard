import axios from "axios";


async function getNftsData(plan, userNfts ) {
    const tokenData = [];
    let metadataUri;
    switch (plan) {
      case 0:
        metadataUri = 'https://drunkskunksdc.mypinata.cloud/ipfs/QmPa2HvB6zV6MWhoJEB49EA4qLvgGoJ4GUwAUDcXZpzsYF/'
        break;
      case 1:
        metadataUri = 'https://drunkskunksdc.mypinata.cloud/ipfs/QmadV6pf2fzgmo3NDbx5fuyxNZUcTaNiGSKbNx3FoWkgAG/'
        break;
      case 2:
        metadataUri = 'https://drunkskunksdc.mypinata.cloud/ipfs/QmXaQyb4yozkyf3znunYNRRDReooxSnzfgLgokM5jKKrdJ/'
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