import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useAccount } from "wagmi";
import axios from "axios";

const useGetStakedNFTs = (plan) => {
  const [ids, setIds] = useState([]);
  const [tokensOfOwner, setTokensOfOwner] = useState([]);
  const { address } = useAccount();
  
  useEffect(() => {
    const fetchIds = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://data-seed-prebsc-1-s2.binance.org:8545"
        );
        const contract = new ethers.Contract(
          addresses.staking,
          abis.staking,
          provider
        );
        const ids = await contract.getStakedTokens(plan, address);
        setIds(ids);
      } catch (error) {
        console.error(error);
      }
    };
    async function getNftsData(userNfts) {
      const tokenData = [];
      for (var j = 0; j < userNfts?.length; j++) {
        const dsdcMetaData = await axios.get(
          `https://bafybeigmbv6qevyposswcncodvket6bl34chc4j6326akxg2xj6arkmfwu.ipfs.nftstorage.link/${userNfts[j]}.json`
        );
        const nftTokenData = {
          img: `https://drunkskunksdc.mypinata.cloud/ipfs/${dsdcMetaData.data.image.slice(
            7
          )}`,
          title: dsdcMetaData.data.name,
          tokenId: userNfts[j],
        };
        tokenData.push(nftTokenData);
      }

      return tokenData;
    }
    async function getData() {
      const tokenData = await getNftsData(ids.map((e) => Number(e)));
      setTokensOfOwner(tokenData);
    }
    fetchIds();
    getData();
  }, [address, plan, ids]);

  return tokensOfOwner;
};

export default useGetStakedNFTs;
