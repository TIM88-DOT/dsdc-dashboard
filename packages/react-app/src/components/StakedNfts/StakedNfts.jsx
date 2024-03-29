import { StakedImageList } from "../StakedImageList/StakedImageList";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import classes from "./StakedNfts.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useAccount, useSigner } from "wagmi";
import { addresses, abis } from "@uniswap-v2-app/contracts";
import { ButtonPrimary, ButtonSecondary } from "../index";
import { ethers } from "ethers";
import { useGetIsApprovedForAll } from "../../hooks/useGetIsApprovedForAll";
import { UnstakedImageList } from "../UnstakedImageList/UnstakedImageList";

import useGetUserNFTs from "../../hooks/useGetUserNFTs";
import useGetStakedNFTs from "../../hooks/useGetStakedNFTs";
import setApprovalForAll from "../../functions/setApprovalForAll";
import getNftsData from "../../helpers/getNftsData";
import getTitle from "../../helpers/getTitle";

export default function StakedNfts(props) {
  const [unstakedTokensOfOwner, setUnstakedTokensOfOwner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedStakeNFT, setSelectedStakeNFT] = useState([]);
  const [selectedUnstakeNFT, setSelectedUnstakeNFT] = useState([]);
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [stakeLoading, setStakeLoading] = useState(false);
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [error, setError] = useState(null);

  const title = getTitle(props.plan);

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

  const isApprovedForAll = useGetIsApprovedForAll(
    props.plan,
    address
  );

  const walletOfOwnerValue = useGetUserNFTs(props.plan);

  const { isLoading, stakedNftsValue } = useGetStakedNFTs(props.plan);

  useEffect(() => {
  }, [selectedUnstakeNFT]);
  const handleClose = () => setOpen(false);

  const approveMaxDsdc = async () => {
    try {
      await setApprovalForAll(props.plan)
    } catch (error) {
      console.error(error);
    }
  };


  const onPickClick = async () => {
    if (address) {
      setStakeLoading(true);
      if (isApprovedForAll === undefined) {
        setLoading(true);
      } else {
        setOpen(true);
        setLoading(true);
        setSelectedUnstakeNFT([]);
        const tokensOfOwner = await getNftsData(props.plan, walletOfOwnerValue);
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
        console.log("props.plan", props.plan);
        console.log("selected Stake NFT", selectedStakeNFT);
        const tx = await dsdcStakingContract.stake(props.plan, selectedStakeNFT);
        await tx.wait()
      } catch (error) {
        console.log(error);
        setError(error.error?.data?.message)
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
        console.log("selectedUnstakeNFT", selectedUnstakeNFT);
        const tx = await dsdcStakingContract.unstake(props.plan, selectedUnstakeNFT);
        await tx.wait();
        setSelectedUnstakeNFT([]);
        setUnstakeLoading(false);
      } catch (error) {
        console.log(error);
        setUnstakeLoading(false);
        setError(error.error?.data?.message);
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



  return (
    <div className={classes.container}>
      <h2>{"YOUR STAKED " + title}</h2>
      {address && isLoading ? (
        <div className={classes.loading}>
          <Typography
            sx={{ marginBottom: "35px" }}
            variant="h6"
            component="h4"
          >
            {"Fetching your staked " + title + '...'}
          </Typography>
          <CircularProgress color="warning" />
        </div>
      ) :
        stakedNftsValue?.length > 0 ? (
          (
            <StakedImageList
              selectedUnstakeNFT={selectedUnstakeNFT}
              setSelectedUnstakeNFT={setSelectedUnstakeNFT}
              itemData={stakedNftsValue}
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

      {
        error && <p sx={{ textAlign: "center" }}>{error}</p>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {"SELECT YOUR " + title + " TO STAKE :"}
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
