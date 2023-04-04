import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { useEthers } from "@usedapp/core";
import axios from "axios";

const useGetStakedNFTs = (plan) => {
  const [ids, setIds] = useState([]);
  const [tokensOfOwner, setTokensOfOwner] = useState([]);
  const { account } = useEthers();
  useEffect(() => {
    const fetchIds = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://bsc-dataseed.binance.org"
        );
        const contract = new ethers.Contract(
          addresses.staking,
          abis.staking,
          provider
        );
        const ids = await contract.getStakedTokens(plan, account);
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
      const tokenData = await getNftsData(ids.map((e) => e.toString()));
      setTokensOfOwner(tokenData);
    }
    fetchIds();
    getData();
  }, [account, plan, ids]);

  return tokensOfOwner;
};

export default useGetStakedNFTs;
