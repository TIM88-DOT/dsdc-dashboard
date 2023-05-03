import { StakedImageList } from "../StakedImageList/StakedImageList";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import classes from "./StakedMutants.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { ButtonPrimary, ButtonSecondary } from "../index";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { useGetIsApprovedForAll } from "../../hooks/useGetIsApprovedForAll";
import { UnstakedImageList } from "../UnstakedImageList/UnstakedImageList";
import useGetUserNFTs from "../../hooks/useGetUserNFTs";
import useGetStakedNFTs from "../../hooks/useGetStakedNFTs";
import setApprovalForAll from "../../functions/setApprovalForAll";

export default function StakedMutants(props) {
  const [tokensOfOwner, setTokensOfOwner] = useState([]);
  const [unstakedTokensOfOwner, setUnstakedTokensOfOwner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const plan = 1;
  const [selectedStakeNFT, setSelectedStakeNFT] = useState([]);
  const [selectedUnstakeNFT, setSelectedUnstakeNFT] = useState([]);
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [stakeLoading, setStakeLoading] = useState(false);
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "15px",
  };


  const allUserNfts = useGetUserNFTs(true);

  const isApprovedForAll = useGetIsApprovedForAll(
    addresses.mutants,
    abis.mutants,
    addresses.staking,
    address
  );


  const stakedNfts = useGetStakedNFTs(plan);

  const handleClose = () => setOpen(false);

  const approveMaxDsdc = async () => {
    try {
      await setApprovalForAll(true)
    } catch (error) {
      console.error(error);
    }
  };

  async function getNftsData(userNfts) {
    const tokenData = [];
    for (var j = 0; j < userNfts?.length; j++) {
      const mutantsMetaData = await axios.get(
        `https://drunkskunksdc.mypinata.cloud/ipfs/QmadV6pf2fzgmo3NDbx5fuyxNZUcTaNiGSKbNx3FoWkgAG/${userNfts[j]}.json`
      );
      const nftTokenData = {
        img: `https://drunkskunksdc.mypinata.cloud/ipfs/${mutantsMetaData.data.image.slice(
          7
        )}`,
        title: mutantsMetaData.data.name,
        tokenId: userNfts[j],
      };
      tokenData.push(nftTokenData);
    }

    return tokenData;
  }

  const onPickClick = async () => {
    if (address && allUserNfts.length) {
      setStakeLoading(true);
      if (isApprovedForAll === undefined) {
        setLoading(true);
      } else {
        setOpen(true);
        setLoading(true);
        setSelectedUnstakeNFT([]);
        const tokensOfOwner = await getNftsData(allUserNfts);
        setUnstakedTokensOfOwner(tokensOfOwner);
        setLoading(false);
      }
    }
    setStakeLoading(false);
  };

  const onStake = async () => {
    const dsdcStakingContract = new ethers.Contract(
      addresses.staking,
      abis.staking,
      signer
    );
    if (selectedStakeNFT.length > 0) {
      try {
        console.log("plan", plan);
        console.log("selected Stake NFT", selectedStakeNFT);
        await dsdcStakingContract.stake(plan, selectedStakeNFT);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onUnstake = async () => {
    const dsdcStakingContract = new ethers.Contract(
      addresses.staking,
      abis.staking,
      signer
    );
    if (selectedUnstakeNFT.length > 0) {
      setUnstakeLoading(true);
      try {
        await dsdcStakingContract.unstake(plan, selectedUnstakeNFT);
        setUnstakeLoading(false);
      } catch (error) {
        console.log(error);
        setUnstakeLoading(false);
      }
    }
  };

  const onSelect = async () => {
    setConfirmLoading(true);
    if (isApprovedForAll === false) {
      await approveMaxDsdc();
      await onStake();
      setConfirmLoading(false);
      setOpen(false);
      return;
    }
    await onStake();
    setConfirmLoading(false);
    setOpen(false);
  };

  useEffect(() => {
    if (address) {
      console.log("staked nfts", stakedNfts);
      getData(stakedNfts);
    }

    async function getData(stakedNfts) {
      const tokenData = await getNftsData(stakedNfts);
      setTokensOfOwner(tokenData);
    }
  }, [address, stakedNfts]);

  return (
    <div className={classes.container}>
      <h2>YOUR STAKED MUTANT(S)</h2>
      {stakedNfts.length > 0 ? (
        loading ? (
          <div className={classes.loading}>
            <Typography
              sx={{ marginBottom: "35px" }}
              variant="h6"
              component="h4"
            >
              Fetching your staked mutants...
            </Typography>
            <CircularProgress color="warning" />
          </div>
        ) : (
          <StakedImageList
            selectedUnstakeNFT={selectedUnstakeNFT}
            setSelectedUnstakeNFT={setSelectedUnstakeNFT}
            itemData={tokensOfOwner}
          />
        )
      ) : (
        <p>Nothing to show</p>
      )}
      <div className={classes.actions}>
        <ButtonPrimary onClick={onPickClick}>
          {stakeLoading ? <CircularProgress size='1.5rem' color="warning" /> : "STAKE"}
        </ButtonPrimary>
        <ButtonSecondary onClick={onUnstake}>
          {unstakeLoading ? <CircularProgress size='1.5rem' color="warning" /> : "UNSTAKE"}
        </ButtonSecondary>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              SELECT YOUR MUTANT TO STAKE:
            </Typography>

            <UnstakedImageList
              itemData={unstakedTokensOfOwner}
              selectedStakeNFT={selectedStakeNFT}
              setSelectedStakeNFT={setSelectedStakeNFT}
              loading={loading}
            />
            <ButtonPrimary style={{ float: "right" }} onClick={onSelect}>
              {confirmLoading ? (
                <CircularProgress size='1.5rem' color="warning" />
              ) : (
                "CONFIRM"
              )}
            </ButtonPrimary>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
